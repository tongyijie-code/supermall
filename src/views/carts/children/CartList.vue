<template>
    <div class="cart-list">
      <template v-if="cartList.length > 0">
        <cart-list-item :product="cart" v-for="cart in cartList"></cart-list-item>
      </template>
      <div v-else class="cart-null">
        <van-empty description="购物车为空" />
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    components: {
      CartListItem
    },
      computed: {
        ...mapGetters(['cartList','length'])
      }
  }
</script>

<style scoped>
  .cart-list{
    color: #ff5777;
  }
  .cart-null {
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 50%;
    transform: translateY(-50%);
    font-size: 30px;
  }
</style>
