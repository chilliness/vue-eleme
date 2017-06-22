<template>
  <div class="btns-wrap">
    <transition name="trans">
      <div class="btn-left" v-show="this.food.cartNum > 0">
        <i class="icon icon-sub_circle" :class="{ sub: this.food.cartNum }" @click.stop="_sub(food, $event)"></i>
        <span class="num">{{ this.food.cartNum }}</span>
      </div>
    </transition>
    <i class="icon icon-add_circle" @click.stop="_add(food, $event)"></i>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    props: {
      food: Object
    },
    methods: {
      ...mapActions(['sub', 'add', 'cartoon']),
      _sub(food, ev) {
        if (!ev._constructed) {
          return;
        }
        this.sub(food);
      },
      _add(food, ev) {
        if (!ev._constructed) {
          return;
        }
        this.add(food);
        this.cartoon(ev.target);
      }
    }
  };
</script>

<style scoped lang="scss">
  .btns-wrap {
    display: flex;
    align-items: center;
    height: 24px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    overflow: hidden;
    .btn-left {
      display: flex;
      align-items: center;
      .num {
        width: 24px;
        text-align: center;
      }
      .sub {
        transform: rotate(720deg);
      }
    }
    .icon {
      width: 24px;
      height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      transition: all .3s;
    }
  }

  .trans-enter-active, .trans-leave-active {
    transform: translate3d(0, 0, 0);
    transition: all .3s;
  }

  .trans-enter, .trans-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
</style>
