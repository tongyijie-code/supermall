<template>
  <div>
    <div class="top">
        <img :src="shop.logo" alt="">
        <span>{{shop.name}}</span>
    </div>
    <div class="bottom">
      <div class="shop-left">
        <div>
          <div>{{shop.sells}}</div>
          <span>总销量</span>
        </div>
        <div>
          <div>{{shop.goods}}</div>
          <span>全部商品</span>
        </div>
      </div>
      <div class="shop-right">
        <table>
          <tr v-for="item in shop.score" :key="item.index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'text-color': item.isBetter}">{{item.score}}</td>
            <td :class="{'text-color': item.isBetter}"><span>{{item.isBetter? '高': '低'}}</span></td>
          </tr>
        </table>
      </div>

    </div>
    <div class="btn">
      <button>进入店铺</button>
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

    }
</script>

<style scoped>

  .top img {
    width: 60px;
    border-radius: 30px;
    vertical-align: middle;
    margin: 5px 8px;
  }

.bottom {
  display: flex;
  text-align: center;
}
.bottom div {
  flex: 1;

}
.shop-left {
  display: flex;
  padding-top: 15px;
  border-right: 1px solid #aaa;
  /*justify-content: space-around;*/
}
table {
  margin-left: 3px;
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
  margin-top: 15px;
  text-align: center;
}
</style>
