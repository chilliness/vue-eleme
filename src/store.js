import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    $handleCart(state, obj) {
      let list = [...state.cartList];
      let index = list.findIndex(item => item.id === obj.id);

      if (index === -1) {
        list.unshift(obj);
      } else {
        obj.cartNum > 0 ? list.splice(index, 1, obj) : list.splice(index, 1);
      }

      state.cartList = list;
    },
    $handleClear(state) {
      [...state.cartList].map(item => (item.cartNum = 0));
      state.cartList = [];
    }
  }
});
