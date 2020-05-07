<template>
  <div class="recommend">
    <div class="recommend-item" :key="item.sort" v-for="item in recommends" >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 15px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 80%;
  margin-bottom: 10px;
}

</style>
