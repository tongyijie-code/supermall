<template>
  <div class="bottom-bar">
    <div class="check-box">
      <check-button
        class="check-button"
        :isChecked="isSelected"
        @click.native="isSelectAll">
      </check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{total}}
    </div>
    <div class="calculate">
      <van-button round type="info" size="small" color="var(--color-tint)">去结算： {{checkLength}}</van-button>
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
    export default {
      name: "CartBottomBar",
      components: {
        CheckButton
      },
      computed: {
          total() {
            return '￥'+ this.$store.state.cartList.filter(item => {
              return item.checked
            }).reduce((prev, curr) => {
              return prev + curr.count * curr.price
            }, 0).toFixed(2)
          },
        checkLength() {
           return this.$store.state.cartList.filter( item => item.checked) .length
        },
        isSelected(){
            if (this.$store.state.cartList.length === 0) return false
            return this.$store.state.cartList.length === this.$store.state.cartList.filter( item => item.checked) .length
        }

      },
      methods: {
        isSelectAll() {
          const isAll = this.isSelected
          this.$store.state.cartList.forEach(item => {
            item.checked = !isAll
          })
        }
      }
    }
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  .check-box {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  .check-button {
    width: 20px;
    margin-right: 5px;
  }
  .calculate {
    margin-right: 10px;
  }
</style>
