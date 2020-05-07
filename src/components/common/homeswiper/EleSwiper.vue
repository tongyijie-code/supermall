<template>
  <div class="index__swiper">
    <el-carousel  :autoplay="true" > <!--height="150px"-->
      <el-carousel-item :key="item.index" v-for="item in banners">
        <img :src="item.image923" alt="" width="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
            return []
        }
      }
    }
}
</script>

<style>

  .index__swiper .el-carousel__button {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    opacity: 1;
  }
  .index__swiper .is-active button {
    background-color: #ff5777;
  }

</style>
