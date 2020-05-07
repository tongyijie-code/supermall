<template>
    <div v-if="Object.keys(goodsItem).length>0" class="goodsItem" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="good-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      },
      goodsIdName: {
        type: String,
        default: 'iid'
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.show ? this.goodsItem.show.img : this.goodsItem.image
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
        // if (this.$route.path.includes('/home')) {
        //   this.$bus.$emit('homeItemImageLoad')
        // }else if (this.$route.path.includes('/detail')) {
        //   this.$bus.$emit('detailImageLoad')
        // }
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem[this.goodsIdName])

        // this.$router.push({
        //   path: '/detail',
        //   query: {}
        // })
      }
    }
  }
</script>

<style scoped>

.goodsItem {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goodsItem img {
  width: 100%;
  border-radius: 5px;
}
.good-info {
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.good-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
  .price{
    color: var(--color-high-text);
    margin-right: 35px;
  }
  .collect {
    position: relative;
  }
  .collect::before{
    content: '';
    display: block;
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") no-repeat 0 0;
    background-size: 14px;
  }
</style>

