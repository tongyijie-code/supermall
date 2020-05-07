<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">   <!--:class="{active: isActive}"-->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props: {
            path: {
                type: String
            },
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        data() {
            return {
                // isActive: true
            }
        },
        computed: {
            isActive() {
                return this.$route.path.includes(this.path)
            },
            //判断是否处于活跃状态，是，设置颜色
            activeStyle() {
                return this.isActive ? {color: this.activeColor}: {}
            }
        },
        methods: {
            itemClick() {
                if (this.$route.path !== this.path) {
                    this.$router.push(this.path)
                }
                // this.$router.push(this.path).then(() => {
                //     // console.log(this.path);
                //     // console.log(this.$route.path);
                // }).catch((err)=>{err});
            }
        }
    }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  /*.active {*/
  /*  color: red;*/
  /*}*/
</style>
