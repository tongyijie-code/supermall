<template>
    <div class="list">
      <div v-for="(item, index) in listDate" :key="index" class="item">
        <span class="icon">
          <img :src="item.icon" alt="">
        </span>
        <div class="item-text">{{item.info}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ListView",
      props:{
          listDate: {
            type: Array,
            default() {
              return []
            }
          }
      }
    }
</script>

<style scoped>
  .list {
    margin-top: 5px;
    background-color: #fff;
  }
  .item {
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 44px;
    line-height: 44px;
  }
  .icon {
    display: flex;
    width: 20px;
    height: 20px;
    text-align: center;
    margin-right: 10px;
  }
  .icon img {
    width: 100%;
  }
  .item-text {
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
  }
</style>
