<template>
  <div class="btn-wrap">
    <div class="btn-handle" v-if="!food.cartNum" @click="handleCart(1)">加入购物车</div>
    <div class="btn-box" v-else>
      <i class="iconfont icon-reduce" @click="handleCart(-1)"></i>
      <span class="num">{{food.cartNum}}</span>
      <i class="iconfont icon-add" @click="handleCart(1)"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    food: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isAjax: false
    };
  },
  methods: {
    handleCart(num) {
      if (this.isAjax) {
        return;
      }

      this.isAjax = true;
      this.food.cartNum += num;
      this.$store.commit('$handleCart', this.food);
      // 保证添加购物车动画的顺利执行
      this.timerOut = setTimeout(() => {
        clearTimeout(this.timerOut);
        this.isAjax = false;
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-wrap {
  font-size: 12px;
  .btn-handle {
    @include frow();
    height: 30px;
    padding: 0 14px;
    color: $fswhite;
    border-radius: 50px;
    background: $bg00a;
  }
  .btn-box {
    @include frow(space-between);
    .iconfont {
      font-size: 30px;
      color: $fs00a;
    }
    .num {
      @include frow();
      width: 26px;
      color: $fs9aa;
    }
  }
}
</style>
