import Vue from "vue";
import Vuex from 'vuex'

import getters from "../views/carts/getter";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state,payload) {
      payload.count++
    },
    addProduct(state,payload) {
      payload.checked = false;
      state.cartList.unshift(payload)
    },
    checkClick(state,payload) {
      payload.checked = !payload.checked
    },
    DEL_PRODUCT(state, iid) {
      state.cartList = state.cartList.filter(cart => {
        return cart.iid !== iid
      })
    },
    /**
     * 更新商品数量
     * @param state
     * @param product
     * @constructor
     */
    UPDATE_PRODUCT(state, product) {
      const targetProductIndex = state.cartList.findIndex(cart => {
        return cart.iid === product.iid
      })

      if (targetProductIndex > -1) {
        state.cartList[targetProductIndex] = product
      }
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct) {
          // oldProduct.count++
          context.commit('addCount',oldProduct)
        } else {
          payload.count = 1;
          context.commit('addProduct',payload)
        }
        resolve('加入购物车成功')
      })
    }
  },
  getters
})

export default store
