<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <!-- 分类 -->
    <tab-control
      v-show="isTabFixed"
      class="isFixed"
      ref="tabControlCopy"
      :titles="['精选','时尚','流行']"
      @tabClick="typeClick">
    </tab-control>

    <scroll
      class="content"
      ref="scrollName"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="homeScroll"
      @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperLoad"></home-swiper>

      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <!-- 分类 -->
      <tab-control
        ref="tabControl"
        :titles="['精选','时尚','流行']"
        @tabClick="typeClick">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backTopClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
// 导入导航
import NavBar from "components/common/navbar/NavBar";
// 导入轮播图组件
import HomeSwiper from "views/home/childComps/HomeSwiper"
import EleSwiper from "../../components/common/homeswiper/EleSwiper";
// 导入推荐栏
import RecommendView from "views/home/childComps/RecommendView"
import FeatureView from "views/home/childComps/FeatureView"
//导入商品分类
import TabControl from "components/content/tabcontrol/TabControl";
//导入商品
import GoodsList from "components/content/goods/GoodsList";
//导入滚动
import Scroll from "components/common/scroll/Scroll";
//导入返回顶部
import BackTop from "components/content/backtop/BackTop";

//导入数据
import {getHomeMultidata, getHomeGoods} from "network/home";
//导入防抖函数
import {debounce} from "common/utils";
import {itemListenerMixin} from "common/mixin";

export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    EleSwiper,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

  },
  mixins: {
    itemListenerMixin
  },
  data() {
    return {
      banners: [],
      recommends: [],
    //  展示的数据
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      scroll: null,
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created() {
    // console.log('create')
    //请求上面的数据
    this.GetHomeDataMethod()
  //  请求展示的商品数据
    this.GetGoodsDataMethod('pop')
    this.GetGoodsDataMethod('new')
    this.GetGoodsDataMethod('sell')
  },
  mounted() {
    // const refresh = debounce(this.$refs.scrollName.refreshMethods, 200)
    // //  挂载后就开始监听item中的图片加载情况
    // this.$bus.$on('itemImageLoad', () => {
    //   // //监听图片加载完，获取到图片高度后，重新计算一下可滚动
    //   // this.$refs.scrollName.scroll.refresh()
    //   refresh()  //这里引用refresh是同一个函数，因为这个是一个闭包，一直引用外面的变量，所以不会被
    // })

  },
  // destroyed() {
  //   console.log('2222')
  // },
  activated() {
    this.$refs.scrollName.scroll.refresh()
    this.$refs.scrollName.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scrollName.getScrollY()

    this.$bus.$off('itemImageLoad',this.itemImageListener)
  },
  methods: {
    /**
     *事件监听相关
     */
// 点击按钮切换
    typeClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
              break;
        case 1:
          this.currentType = 'new';
              break;
        case 2:
          this.currentType = 'sell';
              break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlCopy.currentIndex = index;
    },
    //返回顶部（可以在组件内封装一个函数，直接调用方法）
    backTopClick() {
      //this.$refs.scrollName获取组件，.scroll获取到组件对象，.scrollTo组件对象自己的方法
      this.$refs.scrollName.scrollTo(0, 0, 500)
    },
    //显示隐藏
    homeScroll(position) {
      this.isShow = (-position.y) > 1000
      // 根据距离判断是否吸顶
      this.isTabFixed = (-position.y) >= this.tabOffsetTop;
    },
    //上拉加载更多哦
    loadMore() {
      this.GetGoodsDataMethod(this.currentType)
    },
    swiperLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    /**
     * //网络请求相关
     * @constructor
     */
    GetHomeDataMethod() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res.data.banner.list);
        // console.log(res.data.recommend.list);
      })
    },
    GetGoodsDataMethod(type) {
      const page = this.goods[type].page +1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1 //直接等于page也行
        // console.log(this.goods[type].list)
        // 刷新界面
        this.$refs.scrollName.refreshMethods()
        //获取数据后，结束上拉加载
        this.$refs.scrollName.scroll.finishPullUp()
      })
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  }

};
</script>

<style scoped>
  #home {
    height: 100vh;
    /*padding: 44px 0 49px;*/
    position: relative;
  }
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /*原生滚动时，为了让她固定在顶端设置的*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
  .isFixed {
    position: relative;
    z-index: 9;
  }
  /*.tab-control {*/
  /*  !*sticky在元素到达指定位置之后，变为fixed，有兼容性,父元素不能用overflow:hidden/auto *!*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
