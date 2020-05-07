<template>
    <div class="load">
      <div class="header-img">
        <img src="~assets/img/profile/avatar.svg" alt="">
      </div>
      <div class="regist">
        <div>登录 / 注册</div>
        <div class="phone">
          <img src="~assets/img/profile/phone.svg" alt="">
          <span>暂无绑定手机号</span>
        </div>
      </div>

      <div class="href">
        <van-icon name="arrow" />
      </div>
    </div>
</template>

<script>
    export default {
        name: "Load"
    }
</script>

<style scoped>
.load {
  background-color: var(--color-tint);
  height: 70px;
  display: flex;
  color: white;
  justify-content: space-around;
  align-items: center;
}
  .header-img img{
    width: 60px;
    vertical-align: middle;
  }
  .regist {
    margin-left: -20px;
  }
  .phone{
    margin-top: 5px;
  }
  .phone img{
    width: 20px;
    vertical-align: middle;
    margin-left: -5px;
  }
  .href a{
    color: white;
    font-size: 20px;
  }
</style>
