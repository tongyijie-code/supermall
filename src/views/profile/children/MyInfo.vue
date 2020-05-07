<template>
    <div class="my-info">

      <div class="account-item">
        <div>
          <span class="balance">0.00</span>元
        </div>
        <div>我的余额</div>
      </div>

      <div class="account-item">
        <div>
          <span class="balance">0</span>个
        </div>
        <div>我的收藏</div>
      </div>

      <div class="account-item">
        <div>
          <span class="balance">0</span>分
        </div>
        <div class="account">我的积分</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "MyInfo"
    }
</script>

<style scoped>
.my-info {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.account-item {
  width: 100%;
  text-align: center;
  padding: 10px;
  margin-right: 1px;
  background-color: #fff;
}
  .balance {
    font-size: 24px;
    color: deeppink;
    margin-bottom: 5px;
  }
</style>
