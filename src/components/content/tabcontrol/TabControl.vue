<template>
  <div class="tab-control">
    <div
      v-for="(title,index) in titles"
      class="tab-control-item"
      :class="{active: index===currentIndex}"
      @click="curClick(index)">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default() {
                  return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0,
            }
        },
        methods: {
            curClick(index) {
                this.currentIndex = index
                this.$emit('tabClick', index)
            }
        }
    }
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  background-color: white;
}
.tab-control-item {
  flex: 1;

}
.active span {
  padding: 5px;
  border-bottom: 2px solid var(--color-tint);
  color: var(--color-tint);
}
</style>
