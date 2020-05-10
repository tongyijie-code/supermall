<template>
  <div class="cate-menu">
    <nav-bar>
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">
      <div class="menu">
        <tab-menu
          :category="category"
          @selectItem="selectItem">
        </tab-menu>
      </div>
      <div class="scroll-box">
        <tab-control
          v-show="isTabFixed && !loading"
          class="isFixed"
          :titles="['流行', '新款', '热卖']"
          @tabClick="typeClick"
          ref="tabControlCopy">
        </tab-control>
        <scroll class="tab-content" ref="scrollName" :probe-type="3" @scroll="categoryScroll">
          <template v-if="!loading">
            <tab-content :sub="showSubCategory" @imgLoad="imageLoad"></tab-content>
            <tab-control
              :titles="['流行', '新款', '热卖']"
              @tabClick="typeClick"
              ref="tabControl">
            </tab-control>
            <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
          </template>

          <van-loading v-else size="24px">加载中...</van-loading>
        </scroll>
      </div>
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
    import {itemListenerMixin} from "common/mixin"

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
            currentType: 'pop',
            tabY: 0,
            isTabFixed: false,
            loading: true
          }
      },
      mixins: {
        itemListenerMixin
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
          if (this.currentIndex === -1) return []
          return this.categoryDate[this.currentIndex].categoryDetail[this.currentType]

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

              // this._getSubCategory(0)
              // this._getCategoryDetail('pop')
              // this._getCategoryDetail('new')
              // this._getCategoryDetail('sell')

              this.requestSubCategoryAndDetail(0)
            })
        },
        /**
         * 获取子分类
         */
        _getSubCategory(index) {
          return new Promise((resolve) => {
            this.currentIndex = index
            // this.isTabFixed= false
            const maitKey = this.category[index].maitKey

            getSubCategory(maitKey).then(res => {
              resolve(res)
              this.categoryDate[index].subCategory = res.data
              //里面是每一类的数据
              this.categoryDate = { ...this.categoryDate }
            })
          })
        },
        /**
         * 获取分类详情
         * @param type
         * @private
         */
        _getCategoryDetail(type) {
          return new Promise((resolve) => {
            const miniWallkey = this.category[this.currentIndex].miniWallkey

            getCategoryDetail(miniWallkey, type).then(res => {
              resolve(res)
              this.categoryDate[this.currentIndex].categoryDetail[type] = res
              this.categoryDate = {...this.categoryDate}
            })
          })
        },
        selectItem(index) {
          // this._getSubCategory(index)
          // this._getCategoryDetail('pop')
          // this._getCategoryDetail('new')
          // this._getCategoryDetail('sell')

          this.requestSubCategoryAndDetail(index)
        },
        /**
         * 请求子分类和分类详情
         * @param index
         */
        requestSubCategoryAndDetail(index) {
          this.loading = true

          Promise.all([this._getSubCategory(index), this._getCategoryDetail('pop'), this._getCategoryDetail('new'), this._getCategoryDetail('sell')]).then((res) => {
            this.loading = false
          })
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

        },
        categoryScroll(position) {
          this.tabY = this.$refs.tabControl.$el.offsetTop
          this.isTabFixed = -position.y >= this.tabY;
        },
        //点击tab栏同步
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
  .scroll-box {
    position: relative;
  }
  .tab-content {
    height: 100%;
    overflow: hidden;
  }
  .isFixed {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
</style>
