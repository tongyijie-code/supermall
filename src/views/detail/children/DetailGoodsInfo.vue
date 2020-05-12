<template>
  <div v-if="Object.keys(detailInfo).length>0" class="info">
<!--    描述-->
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">
        {{detailInfo.desc}}
      </div>
      <div class="end"></div>
    </div>
<!--    图片展示-->
    <div class="info-desc">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-image">
      <img  v-for="item in detailInfo.detailImage[0].list" :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailGoodsInfo",
      props: {
        detailInfo: {
          type: Object,
          default () {
            return {}
          }
        }
      },
      data() {
          return {
            counter: 0,
            imgLength: 0,
          }
      },
      computed: {
          detailInfoLength() {
            return this.imgLength = this.detailInfo.detailImage[0].list.length
          }
      },
      methods: {
        imgLoad() {
          // console.log(this.imgLength)
          if (++this.counter === this.detailInfoLength) {
            this.$emit('imageLoad')
          }
        }
      },
      // imgLoad() {
      //   console.log(this.imgLength)
      //   if (++this.counter === this.imgLength) {
      //     this.$emit('imageLoad')
      //   }
      // }
      // watch: {
      //   detailInfo: {
      //     immediate: true,
      //     handler() {
      //       this.imgLength = this.detailInfo.detailImage[0].list.length
      //     }
      //   }
      // }
    }
</script>

<style scoped>
  .info {
    text-align: center;
    border-bottom: 5px solid #f2f5f8;
  }
.info-image img{
  width: 98%;
}
</style>
