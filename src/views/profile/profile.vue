<template>
  <div class="profile">
    <nav-bar class="nav">
      <div slot="center">我的档案</div>
    </nav-bar>

    <load></load>

    <my-info></my-info>

    <list-view :list-date="orderList"></list-view>

    <list-view :list-date="serviceList"></list-view>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Load from "./children/Load";
  import MyInfo from "./children/MyInfo";
  import ListView from "./children/ListView";
  import msgIcon from '@/assets/img/profile/message.svg'
  import pointer from '@/assets/img/profile/pointer.svg'
  import vip from '@/assets/img/profile/vip.svg'
  import cart from '@/assets/img/profile/cart.svg'
  import shopping from '@/assets/img/profile/shopping.svg'


  export default {
    name: "profile",
    components: {
      NavBar,
      Load,
      MyInfo,
      ListView
    },
    data() {
      return {
        orderList: [
          {icon: msgIcon, iconColor: '#ff8198', info: '我的消息'},
          {icon: pointer, iconColor: '#fc7b53', info: '积分商城'},
          {icon: vip, iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: cart, iconColor: '#ff8198', info: '我的购物车'},
          {icon: shopping, iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  .profile {
    background-color: #f3f3f3;
  }
.nav {
  background-color: var(--color-tint);
  color: #fff;
}
  .service-list {
    margin-top: 12px;
  }
</style>
