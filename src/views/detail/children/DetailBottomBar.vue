<template>
    <div class="bottom-bar">
      <div class="bar-item bar-left">
        <div>
          <i class="icon service"></i>
          <span>客服</span>
        </div>
        <div>
          <i class="icon shop"></i>
          <span>店铺</span>
        </div>
        <div>
          <i class="icon select"></i>
          <span>收藏</span>
        </div>
      </div>
      <div class="bar-item bar-right">
        <div class="cart" @click="addClick">加入购物车</div>
        <div class="buy">立即购买</div>
      </div>

    </div>
</template>

<script>
  export default {
      name: "DetailBottomBar",
      methods: {
        addClick() {
          this.$emit('addCart',)
        }
      }
  }
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 58px;
  background-color: pink;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
  position: relative;
  margin-top: 44px;
  color: black;

}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item div {
  flex: 1;
  text-align: center;
}
.bar-left {
  font-size: 15px;
}
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    margin: 5px auto;
  }
 .bar-left .service {
    background-position: 0 -52px;
  }
.bar-left .shop {
  background-position: 0 -98px;
}
.bar-left .select {
  background-position: 0 -150px;
}
  .bar-right {
    line-height: 58px;
    font-size: 18px;
    color: #fff;
  }
  .cart {
    background-color: goldenrod;
  }
</style>
