<template>
  <div class="cart-wrap">
    <div class="normal-box">
      <div class="icon-box" @click="handleToggle">
        <span class="num" v-if="_cart.num">{{_cart.num}}</span>
        <div class="bg-box">
          <i class="iconfont icon-cart" :class="{anim: isAnim}"></i>
        </div>
      </div>
      <div class="price-box">
        <span class="price">{{'￥' + _cart.payment}}</span>
        <span class="delivery">另需配送费￥4元</span>
      </div>
      <div class="btn-buy" v-if="20 - _cart.payment > 0">{{'还差￥' + (20 - _cart.payment) + '元起送'}}</div>
      <div class="btn-buy active" v-else>{{'需支付￥' + (4 + _cart.payment) + '元'}}</div>
    </div>
    <div class="cart-outer" :class="{show: isShow}">
      <div class="holder" @click="isShow = false"></div>
      <div class="cart-box">
        <div class="btn-bar">
          <span class="btn btn-cancel">购物车</span>
          <span class="btn btn-clear" @click="handleClear">清空</span>
        </div>
        <div class="list-outer" ref="scroll">
          <ul class="list-box">
            <li class="item-box" v-for="(item, index) in _cart.list" :key="index">
              <span class="text">{{item.name}}</span>
              <div class="price-bar">
                <span class="price">{{'￥' + item.price}}</span>
                <Btn :food="item"></Btn>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      isShow: false,
      isAnim: false
    };
  },
  computed: {
    _cart() {
      let list = this.$store.state.cartList;
      let num = 0;
      let payment = 0;
      list.map(item => {
        num += item.cartNum;
        payment += item.cartNum * item.price;
      });
      return { num, list, payment };
    }
  },
  mounted() {
    this.handleInitScroll('scroll');
  },
  methods: {
    handleInitScroll(ref, config = { scrollY: true, click: true }) {
      this.$nextTick(() => {
        if (!this[ref]) {
          this[ref] = new this.$BScroll(this.$refs[ref], config);
        } else {
          this[ref].refresh();
        }
      });
    },
    handleToggle() {
      if (this._cart.num > 0) {
        this.isShow = !this.isShow;
      }
    },
    handleClear() {
      this.$store.commit('$handleClear');
    }
  },
  watch: {
    '_cart.num'(val, oldVal) {
      val < 1 && (this.isShow = false);
      if (val > oldVal) {
        this.isAnim = true;

        clearTimeout(this.timerOut);
        this.timerOut = setTimeout(() => {
          clearTimeout(this.timerOut);
          this.isAnim = false;
        }, 200);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  height: 48px;
  .normal-box {
    position: relative;
    z-index: 9;
    @include frow(space-between);
    height: 100%;
    font-size: 12px;
    color: $fs9aa;
    background: $bg181;
    .icon-box {
      position: relative;
      top: -1px;
      width: 56px;
      height: 56px;
      margin: 0 12px;
      .num {
        position: absolute;
        right: 0;
        top: 0;
        @include frow();
        height: 18px;
        padding: 0 8px;
        color: $fswhite;
        border-radius: 50px;
        background: $bgf01;
        & + .bg-box {
          color: $fswhite;
          background: $bg00a;
        }
      }
      .bg-box {
        @include frow();
        width: 44px;
        height: 44px;
        border: 6px solid $bd181;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        .iconfont {
          font-size: 24px;
          &.anim {
            animation: anim-heart 0.1s;
          }
        }
      }
    }
    .price-box {
      @include frow(flex-start);
      flex: 1;
      .price {
        font-size: 16px;
        font-weight: bold;
      }
      .delivery {
        @include frow(flex-start);
        height: 25px;
        margin-left: 12px;
        padding-left: 12px;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    .btn-buy {
      @include frow();
      width: 105px;
      height: 100%;
      font-weight: bold;
      background: rgba(255, 255, 255, 0.1);
      &.active {
        color: $fswhite;
        background: $bg00a;
      }
    }
  }
  .cart-outer {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 8;
    @include fcol(space-between, stretch);
    padding-bottom: 48px;
    overflow: hidden;
    transform: translate3d(0, 100%, 0);
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    &.show {
      transform: translate3d(0, 0, 0);
    }
    .holder {
      flex: 1;
      backdrop-filter: blur(10px);
      background: rgba(7, 17, 27, 0.8);
    }
    .cart-box {
      background: $bgwhite;
      width: 100%;
      font-size: 14px;
      .btn-bar {
        @include frow(space-between);
        height: 40px;
        border-bottom: 1px solid $bdeee;
        background: $bgf3f;
        .btn {
          @include frow();
          height: 100%;
          padding: 0 18px;
          &.btn-clear {
            color: $fs00a;
          }
        }
      }
      .list-outer {
        max-height: 260px;
        overflow: hidden;
        .item-box {
          @include frow(space-between);
          height: 48px;
          margin: 0 18px;
          &:nth-of-type(n + 2) {
            border-top: 1px solid $bdeee;
          }
          .text {
            flex: 1;
            padding-right: 10px;
            font-weight: bold;
            @include dot();
          }
          .price-bar {
            @include frow(flex-start);
            .price {
              margin-right: 12px;
              color: $fsf01;
            }
          }
        }
      }
    }
  }
}

@keyframes anim-heart {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
</style>
