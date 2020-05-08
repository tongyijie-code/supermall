<template>
      <div class="content">
        <div v-for="good in sub.list" class="item">
          <a :href="good.link">
            <img :src="good.image" alt="" class="item-image" @load="imgLoad">
            <p class="title">{{good.title}}</p>
          </a>
        </div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
</template>

<script>
    export default {
      name: "TabContent",
      data() {
        return {
          shopList: []
        }
      },
      props: {
        sub: {
          type: Object,
          default(){
            return {}
          }
        }
      },
      methods: {
        imgLoad() {
          this.$emit('imgLoad')
        }
      }
    }
</script>

<style scoped>
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    font-size: 12px;
  }
  .item {
    width: 30%;
    margin-top: 5px;

  }
.item-image {
  border-radius: 50%;
  width: 90%;
}
  .title {
    margin-top: 3px;
  }
</style>
