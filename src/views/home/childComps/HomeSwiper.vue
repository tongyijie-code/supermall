<template>
  <div>
    <swiper>
    <swiper-item :key="item.index" v-for="item in banners">
      <img :src="item.image" alt="" @load="imageLoad"/>
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    SwiperItem,
    Swiper
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
};
</script>

<style></style>
