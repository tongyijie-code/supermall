<template>
  <div class="wrapper" ref="eleScroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        components: {
          BScroll
        },
        props: {
          probeType: {
            type: Number,
            default: 0
          },
          pullUpLoad: {
            type: Boolean,
            default: false
          },

        },
        data() {
          return {
            scroll: null
          }
        },
        mounted() {
          //创建BScroll对象
          this.scroll = new BScroll(this.$refs.eleScroll,{
            // probeType: 3, 实时监听 // pullUpLoad: true, // tab: true,
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
          })

          // 滚动到0,0位置    // this.scroll.scrollTo(0,0)
          // 监听滚动位置
          if (this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll', position => {
              this.$emit('scroll', position)
            })
          }

          // 上拉加载更多
          if (this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
              // console.log('上拉加载')
              this.$emit('pullingUp')
            })
          }
        },
      methods: {
          scrollTo(x, y, time=300) {
            this.scroll && this.scroll.scrollTo(x, y, time)
          },
          refreshMethods() {
            // console.log('------')
            this.scroll && this.scroll.refresh()
          },

          getScrollY() {
            return this.scroll ? this.scroll.y: 0
          }
      }
    }
</script>

<style scoped>

</style>
