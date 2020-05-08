<template>
  <div class="shop-info">
    <div class="shop-top">
        <img :src="shop.logo" alt="">
        <span class="title">{{shop.name}}</span>
    </div>
    <div class="bottom">
      <div class="shop-left">
        <div class="sells=info">
          <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
          <span class="sells-text">总销量</span>
        </div>
        <div class="goods-info">
          <div class="goods-count">{{shop.goods}}</div>
          <span class="goods-text">全部商品</span>
        </div>
      </div>
      <div class="shop-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'text-color': item.isBetter}">{{item.score}}</td>
            <td :class="{'text-color': item.isBetter}"><span>{{item.isBetter? '高': '低'}}</span></td>
          </tr>
        </table>
      </div>

    </div>
    <div class="btn">
      <div class="enter-shop">进入店铺</div>
    </div>

  </div>

</template>

<script>
    export default {
        name: "DetailShopper",
        props: {
          shop: {
            type: Object,
            default() {
              return {}
            }
          }
        },
      filters: {
        sellCountFilter: function (value) {
          return value < 10000? value: (value/10000).toFixed(2) +'万'
        }
      }

    }
</script>

<style scoped>
.shop-info {

  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  height: 45px;
  line-height: 45px;
}
  .shop-top img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
.shop-top .title {
  margin-left: 10px;
}
.sells-text, .goods-text {
  margin-top: 10px;
  font-size: 12px;
}
.bottom {
  margin-top: 15px;
  display: flex;
  text-align: center;
  align-items: center;
}
.bottom>div {
  flex: 1;
}
.shop-left {
  display: flex;
  text-align: center;
  color: #333;
  /*padding-top: 10px;*/
  border-right: 1px solid #ccc;
  justify-content: space-evenly
}
.sells-count, .goods-count {
  font-size: 16px;
}
.shop-right {
  font-size: 13px;
}
table {
  width: 160px;
  margin-left: 20px;
}
td {
  padding: 2px 5px;
}
.score {
  color: green;
}
.text-color span{
    color: #fff;
    background-color: red;
  }
.btn {
  margin-top: 10px;
  text-align: center;
}
  .enter-shop {
    margin: 0 auto;
    width: 150px;
    height: 30px;
    background-color: #f2f5f8;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>
