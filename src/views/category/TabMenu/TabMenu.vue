<template>
    <scroll ref="scrollName" class="tab-menu">
      <div class="menu-list">
        <div class="menu-item"
             :class="{active: currentIndex===index}"
             v-for="(item, index) in category"
             :key="index"
             @click="itemClick(index)">
          <div>{{item.title}}</div>
        </div>
      </div>
    </scroll>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
    export default {
      name: "TabMenu",
      components:{
        Scroll
      },
      data() {
        return {
          currentIndex: 0
        }
      },
      props: {
        category: {
          type: Array,
          default() {
            return []
          }
        }
      },
      methods: {
        itemClick(index) {
           this.currentIndex = index
           this.$emit('selectItem', index)
        }
      }
    }
</script>

<style scoped>
.tab-menu {
  width: 100px;
  background-color: #f2f2f2;
  text-align: center;
  height: 100%;
  overflow: hidden;
}
  .menu-item {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
  }
  .active {
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 2px solid var(--color-high-text);

  }
</style>
