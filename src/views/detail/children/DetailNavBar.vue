<template>
  <nav-bar>
    <template v-slot:left>
      <div @click="back">
        <img src="~assets/img/common/back.svg" alt="" class="back">
      </div>
    </template>
    <template v-slot:center>
      <div class="titles">
        <div
          v-for="(item, index) in titles"
          @click="itemClick(index)" :class="{active: currentIndex === index}">
          {{item}}
        </div>
      </div>

    </template>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
      components:{
          NavBar
      },
      data() {
        return {
          titles: ['商品','参数','评论','推荐'],
          currentIndex: 0
        }
      },
      methods: {
          itemClick(index) {
            this.currentIndex = index
            this.$emit('titleClick', index)
          },
        back() {
            this.$router.back(-1)
        }
      }
    }
</script>

<style scoped>
.titles {
  display: flex;
}
  .titles div {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
  }
  .back {
    margin: 12px auto auto 10px;
  }
</style>
