<template>
    <div class="goods">
      <goods-list-item
        v-for="item in goods"
        :key="item.index"
        :goods-item="item"
        :goods-id-name="goodsIdName">
      </goods-list-item>
    </div>
</template>

<script>
   import GoodsListItem from "./GoodsListItem";
    export default {
      name: "GoodsList",
      components: {
        GoodsListItem
      },
      props:{
        goods: {
          type: Array,
          default() {
            return []
          }
        },
        goodsIdName: {
          type: String,
          default: 'iid'
        }
      }
    }
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

}

</style>
