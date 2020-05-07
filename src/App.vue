<template>
  <div id="app">
    <main-tab-bar class="main-bar"/>

    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from "components/common/mainTabbar/MainTabBar";
import NavBar from "components/common/navbar/NavBar";

export default {
  name: 'App',
  components: {
      NavBar,
      MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
#app {
  max-width: 500px;
  margin: 0 auto;
}
 .main-bar {
   z-index: 9;

 }
</style>
