import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      newRefresh: null,
      itemImageListener: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scrollName.refreshMethods, 100)
    this.itemImageListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', /*() => {this.newRefresh()}*/
      this.itemImageListener
    )
  },

  methods: {
    refreshContentHeight() {

    }
  }
}
