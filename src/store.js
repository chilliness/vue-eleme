import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    seen: false,
    food: {},
    goods: [],
    cartoonObj: {
      num: 0,
      el: {}
    },
    like: localStorage.getItem('like')
  },
  mutations: {
    show(state, obj) {
      state.seen = true;
      state.food = obj;
    },
    hide(state) {
      state.seen = false;
    },
    add(state, obj) {
      let temp = state.goods.findIndex((item) => {
        return item.name === obj.name && item.info === obj.info;
      });
      if (temp === -1) {
        state.goods.push(obj);
      } else {
        state.goods.splice(temp, 1, obj);
      }
    },
    sub(state, obj) {
      let temp = state.goods.findIndex((item) => {
        return item.name === obj.name && item.info === obj.info;
      });
      if (obj.cartNum < 1) {
        state.goods.splice(temp, 1);
      } else {
        state.goods.splice(temp, 1, obj);
      }
    },
    del(state) {
      state.goods.map((item) => {
        item.cartNum = 0;
      });
      state.goods = [];
    },
    cartoon(state, obj) {
      state.cartoonObj.num++;
      state.cartoonObj.el = obj;
    },
    toggleLike(state) {
      if (state.like) {
        state.like = false;
        localStorage.clear();
      } else {
        state.like = true;
        localStorage.setItem('like', true);
      }
    }
  },
  actions: {
    show({commit}, obj) {
      commit('show', obj);
    },
    hide({commit}) {
      commit('hide');
    },
    add({commit}, obj) {
      obj.cartNum++;
      commit('add', obj);
    },
    sub({commit}, obj) {
      obj.cartNum--;
      commit('sub', obj);
    },
    del({commit}) {
      commit('del');
    },
    cartoon({commit}, obj) {
      commit('cartoon', obj);
    },
    toggleLike({commit}) {
      commit('toggleLike');
    }
  }
});
