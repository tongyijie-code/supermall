<template>
  <div class="cart">
    <!--顶部导航-->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <p>购物车({{length}})</p>
      </template>
    </nav-bar>

    <!--购物车信息-->
    <scroll class="wrapper" ref="scrollName">
      <cart-list ></cart-list>
    </scroll>

    <!--底部tab栏-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import CartList from "./children/CartList";
  import {mapGetters} from 'vuex'
  import CartBottomBar from './children/CartBottomBar'

  export default {
    name: "cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottomBar

    },
    computed: {
      // cartLength() {
      //   return this.$store.state.cartList.length
      // }
      // cartLength() {
      //   return this.$store.getters.length
      // }
      ...mapGetters(['length'])
    },
    activated() {
      this.$refs.scrollName.refreshMethods()
    }
  }
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}

.wrapper {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
  background-color: #fff;
}
</style>
