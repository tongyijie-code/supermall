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

      <scroll class="tab-content">
        <tab-content :sub="showSubCategory"></tab-content>
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

    export default {
      name: "category",
      components: {
        NavBar,
        TabMenu,
        Scroll,
        TabContent
      },
      data() {
          return {
            category: [],
            categoryDate: {},
            currentIndex: -1
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

          //  data, date
          })
        },
        /**
         * 获取分类详情
         * @param type
         * @private
         */
        _getCategoryDetail(type) {
          const miniWallKey = this.category[this.currentIndex].miniWallKey
          getCategoryDetail(miniWallKey, type).then(res => {
            this.categoryDate[this.currentIndex].categoryDetail[type] = res
            this.categoryDate = {...this.categoryDate}
          })
        },
        selectItem(index) {
          this._getSubCategory(index)
        }
      }
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
