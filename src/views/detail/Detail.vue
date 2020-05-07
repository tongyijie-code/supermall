<template>
    <div id="detail" >
      <detail-nav-bar
        class="nav"
        ref="scrollIndex"
        @titleClick="titleClick">
      </detail-nav-bar>

      <scroll class="content" ref="scrollName" :probeType="3" @scroll="scrollContent">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in topImage" :key="item.index">
            <img :src="item" alt="" width="100%">
          </van-swipe-item>
        </van-swipe>

        <!-- 商品基本信息 -->
        <detail-base-info :goods="goods"></detail-base-info>

        <!-- 商家基本信息     -->
        <detail-shopper :shop="shop"></detail-shopper>

        <!--商品详情-->
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>

        <!-- 商品参数-->
        <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>

        <!-- 商品评论 -->
        <detail-comment :comment="comment" ref="comment"></detail-comment>

        <!-- 商品推荐 -->
        <goods-list :goods="recommends" ref="recommend" goods-id-name="item_id"></goods-list>
      </scroll>

      <!-- 底部导航 -->
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    </div>
</template>

<script>
  //导入导航
  import DetailNavBar from "./children/DetailNavBar";
  //获取分装数据,推荐数据等
  import {getDetail, Goods, Shopper, GoodsParem, getRecommend} from 'network/getDetail'
  //轮播图
  import EleSwiper from "components/common/homeswiper/EleSwiper";
  //导入商品基本信息
  import DetailBaseInfo from "./children/DetailBaseInfo";
  //导入商家信息部分
  import DetailShopper from "./children/DetailShopper";
  //倒入轮播图
  import Scroll from "../../components/common/scroll/Scroll";
  //导入商品详情数据
  import DetailGoodsInfo from "./children/DetailGoodsInfo";
  //导入参数组件
  import DetailParamInfo from "./children/DetailParamInfo";
  //导入评论组件
  import DetailComment from "./children/DetailComment";
  //导入goodList组件
  import GoodsList from "../../components/content/goods/GoodsList";
  //导入底部购物车栏
  import DetailBottomBar from "./children/DetailBottomBar"

  //导入混入
  import {itemListenerMixin} from "common/mixin"
  import {debounce} from "../../common/utils";


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      EleSwiper,
      DetailBaseInfo,
      Shopper,
      DetailShopper,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      GoodsList,
      DetailBottomBar,
    },
    mixins: [itemListenerMixin],
    data() {
        return {
          iid: null,
          topImage: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          comment: {},
          recommends: [],
          themeTopYs: [],
          getThemeTopY: null,
          currentIndex: 0,
        }
    },
    watch: {
      '$route' (to, from) {
        this.init()
      }
    },
    created() {
      this.init()
    },
    destroyed() {
      //离开home页面取消监听图片加载
      // console.log('-----detail------')
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      init() {
        //1.保存传入的id
        this.iid = this.$route.params.iid

        //  根据传入的id，请求详情页数据
        getDetail(this.iid).then(res => {
          // console.log(res)
          this.topImage = res.result.itemInfo.topImages.slice(0, 5)

          const date = res.result
          //获取详情页展示数据的对象
          this.goods = new Goods(date.itemInfo, date.columns, date.shopInfo.services)
          //  获取店铺的展示信息
          this.shop = new Shopper(date.shopInfo)
          //  获取商品的详细信息
          this.detailInfo = date.detailInfo
          //  商品参数数据
          this.paramInfo = new GoodsParem(date.itemParams.info, date.itemParams.rule)
          //评论数据
          if (date.rate.cRate !== 0) {
            this.comment = date.rate.list[0]
          }

          this.getThemeTopY = debounce(() => {
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE)
            console.log(this.themeTopYs)
          },200)

        });

        // 获取推荐数据
        getRecommend().then(res => {
          this.recommends = res.data.list
          // console.log(this.recommends)
        })
      },
      imageLoad() {
        this.newRefresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index)
        this.$refs.scrollName.scrollTo(0,-this.themeTopYs[index],200)
      },
      scrollContent(position) {
        const positionY = -position.y

        // console.log(positionY)

        for (let i =0; i < this.themeTopYs.length-1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.scrollIndex.currentIndex = this.currentIndex
          }
        }
      },
      addToCart() {
        //  获取购物车需要展示的信息
        const product = {}
        product.iid =this.iid;
        product.image = this.topImage[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price= this.goods.realPrice;
        //通过mutations修改
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast({
            duration: 1000,
            message: res
          })
        })
      }

    }
  }
</script>

<style scoped>
  >>> .el-carousel__button {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    opacity: 1;
  }
  >>> .is-active button {
    background-color: #ff5777;
  }

  .my-swipe .van-swipe-item {
    height: 300px;
  }
#detail {
  position: relative;
  z-index: 9;
  background-color: white;
  height: 100vh;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
}

.content {
  /*position: absolute;*/
  /*top: 44px;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
  position: relative;
  top: 44px;
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>
