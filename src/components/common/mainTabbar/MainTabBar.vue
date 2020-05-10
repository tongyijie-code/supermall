<template>
  <tab-bar v-show="showMenu">
    <tab-bar-item
      v-for="menu in menuList"
      :key="menu.path"
      :path="menu.path">
      <img slot="item-icon" :src="menu.icon" alt="">
      <img slot="item-icon-active" :src="menu.activeIcon" alt="">
      <div slot="item-text">{{ menu.name }}</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  import homeIcon from 'assets/img/tabbar/home.svg'
  import homeIconActive from 'assets/img/tabbar/home_active.svg'
  import categoryIcon from 'assets/img/tabbar/category.svg'
  import categoryIconActive from 'assets/img/tabbar/category_active.svg'
  import shopcartIcon from 'assets/img/tabbar/shopcart.svg'
  import shopcartIconActive from 'assets/img/tabbar/shopcart_active.svg'
  import profileIcon from 'assets/img/tabbar/profile.svg'
  import profileIconActive from 'assets/img/tabbar/profile_active.svg'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    },
    data() {
      return {
        showMenuPathList: ['/home', '/category', '/cart', '/profile'],
        menuList: [
          { name: '首页', path: '/home', icon: homeIcon, activeIcon: homeIconActive},
          { name: '分类', path: '/category', icon: categoryIcon, activeIcon: categoryIconActive},
          { name: '购物车', path: '/cart', icon: shopcartIcon, activeIcon: shopcartIconActive},
          { name: '我的', path: '/profile', icon: profileIcon, activeIcon: profileIconActive}
        ]
      }
    },
    computed: {
      currentPath() {
        return this.$route.path
      },
      /**
       * @returns {Boolean}
       */
      showMenu() {
        return this.showMenuPathList.includes(this.currentPath)
      }
    }
  }
</script>

<style scoped>

</style>
