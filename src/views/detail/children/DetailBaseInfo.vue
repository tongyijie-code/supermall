<template>
    <div v-if="Object.keys(goods).length>0" class="goods-dec">
      <p class="title">{{goods.title}}</p>
      <div class="price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
      </div>
      <div class="other-info">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.service[goods.service.length-1].name}}</span>
      </div>
      <div class="address">
        <div v-for="item in goods.service.length-1">
          <img :src="goods.service[item].icon" alt="">
          <span>{{goods.service[item].name}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
        goods: {
          type: Object,
          default() {
            return {}
          }
        }
    }
  }
</script>

<style scoped>
 .goods-dec {
   padding: 3px 8px;
 }
.title {
  padding: 10px 0;


}
.n-price {
  font-size: 20px;
  color: var(--color-high-text);
}
.o-price {
  font-size: 12px;
  margin: 0 8px;
  text-decoration: line-through;
  color: #666;
}
.discount {
  font-size: 10px;
  color: white;
  position: relative;
  top: -10px;
  padding: 3px 5px;
  border-radius: 5px;
  background-color: var(--color-high-text);
}
.other-info {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}
 .other-info span {
  font-size: 14px;
   color: #999;
 }
  .address {
    margin-top: 5px;
    box-shadow: 0 2px 4px -3px #666666;
    height: 60px;
    line-height: 50px;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
  }
 .address img {
   width: 15px;
   height: 15px;
   vertical-align: middle;
   margin-top: -2px;
 }
</style>
