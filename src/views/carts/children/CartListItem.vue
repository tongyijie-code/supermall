<template>

    <van-swipe-cell>
      <div class="shop-item">
        <!--全选-->
        <div class="item-select">
          <check-button :isChecked="product.checked" @click.native="checkClick"></check-button>
        </div>
        <!--图片-->
        <div class="item-image">
          <img :src="product.image" alt="商品图片" class="image">
        </div>

        <!--商品信息-->
        <div class="item-info">
          <h4 class="item-title">{{product.title}}</h4>
          <p class="item-desc">{{product.desc}}</p>
          <div class="item-bottom">
            <span class="item-price">￥{{product.price}}</span>
            <van-stepper v-model="product.count" @change="handleChange" />
          </div>
        </div>
      </div>

      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="del(product.iid)"/>
      </template>
    </van-swipe-cell>
</template>

<script>
  import CheckButton from './CheckButton'
    export default {
      name: "CartListItem",
      components: {
        CheckButton
      },
      props: {
        product: {
          type: Object,
          default() {
            return {};
          }
        },
      },
      methods: {
        checkClick() {
          this.$store.commit('checkClick', this.product)
          // this.$store.dispatch('addCart',product)
        },
        del(iid) {
          this.$store.commit('DEL_PRODUCT', iid)
        },
        handleChange() {
          this.$store.commit('UPDATE_PRODUCT', this.product)
        }
      }
    }
</script>

<style scoped>
  .delete-button {
    height: 100%;
  }
.shop-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-select {

}
.item-image {
  padding: 5px;

}
.image {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
.item-info {
  overflow: hidden;
  padding: 5px 10px;
  font-size: 17px;
  color: #333;

}
  .item-title, .item-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
.item-info .item-desc {
  font-size: 14px;
  margin-top: 15px;
  color: #666;
}
.item-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.item-price {
  color: #ff5777;
}
.count a {
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  display: inline-block;
  border: 1px solid #666;
}
  .count span{
    width: 20px;
    padding: 10px;
  }
</style>
