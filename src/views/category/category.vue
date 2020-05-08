<template>
  <div class="cate-menu">
    <nav-bar>
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">
      <tab-menu
        :category="category"
        @selectItem="selectItem">
      </tab-menu>

      <scroll class="tab-content" ref="scrollName">
        <tab-content :sub="showSubCategory" @imgLoad="imageLoad"></tab-content>
        <tab-control :titles="['流行', '新款', '热卖']" @tabClick="tabClick"></tab-control>
        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import TabMenu from "./TabMenu/TabMenu";
    import Scroll from "../../components/common/scroll/Scroll";
    import { getCategory, getSubCategory, getCategoryDetail} from "@/network/category"
    import TabContent from "./children/TabContent"
    import TabControl from "../../components/content/tabcontrol/TabControl";
    import {debounce} from "../../common/utils";
    import TabContentDetail from "./children/TabContentDetail";

    export default {
      name: "category",
      components: {
        NavBar,
        TabMenu,
        Scroll,
        TabContent,
        TabControl,
        TabContentDetail
      },
      data() {
          return {
            category: [],
            categoryDate: {},
            currentIndex: -1,
            currentType: 'pop'
          }
      },
      created() {
        this._getCategory()
      },
      mounted() {

      },
      computed:{
        showSubCategory() {
          if (this.currentIndex === -1) return {}
          return this.categoryDate[this.currentIndex].subCategory
        },
        showCategoryDetail() {
          if (this.currentIndex === -1) return {}
          return this.categoryDate[this.currentIndex].categoryDetail[this.currentType]
          console.log('--========')
          console.log(this.categoryDate[this.currentIndex].categoryDetail[this.currentType])
        }
      },
      methods: {
        /**
         * 获取分类
         */
        _getCategory() {
            //请求详情页的标题数据数据,及对应的maitKey和miniWallkey
            getCategory().then(res => {
              //获取详情页的标题数据
              this.category = res.data.category.list

              // 初始化每个类的子数据
              for (let i = 0; i<this.category.length; i++) {
                this.categoryDate[i] = {
                  subCategory : {},
                  categoryDetail: {
                    'pop': [],
                    'new': [],
                    'sell': []
                  }
                }
              }

              this._getSubCategory(0)
            })
        },
        /**
         * 获取子分类
         */
        _getSubCategory(index) {
          this.currentIndex = index
          const maitKey = this.category[index].maitKey

          getSubCategory(maitKey).then(res => {
            console.log('----')
            this.categoryDate[index].subCategory = res.data
            //里面是每一类的数据
            this.categoryDate = { ...this.categoryDate }
            console.log(this.categoryDate[index])
            this._getCategoryDetail('pop')
            this._getCategoryDetail('new')
            this._getCategoryDetail('sell')
          })
        },
        /**
         * 获取分类详情
         * @param type
         * @private
         */
        _getCategoryDetail(type) {
          const miniWallkey = this.category[this.currentIndex].miniWallkey
          getCategoryDetail(miniWallkey, type).then(res => {
            console.log(res)
            this.categoryDate[this.currentIndex].categoryDetail[type] = res
            this.categoryDate = {...this.categoryDate}
          })
        },
        selectItem(index) {
          this._getSubCategory(index)
        },
        imageLoad() {
          debounce(this.$refs.scrollName.refreshMethods(), 500)
        },
        tabClick(index) {
          switch (index) {
            case 0:
              this.currentType = 'pop'
                  break
            case 1:
              this.currentType ='new'
                  break
            case 2:
              this.currentType = 'sell'
                  break
          }

        }
      },

    }
</script>

<style scoped>
  .cate-menu {
    height: 100vh;
  }
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
  .content {
    height: calc(100% - 44px - 49px);
    display: flex;
  }
  .tab-content {
    height: 100%;
    /*background-color: #fccccc;*/
    flex: 1;
    overflow: hidden;
  }
</style>
