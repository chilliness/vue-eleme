<template>
  <div class="carts-wrap">
    <div class="carts-box" @click="toggle">
      <div class="left" :class="{ on: calcTotal() }">
        <div class="cart">
          <i class="icon icon-cart"></i>
          <span class="num" v-show="calcTotal()">{{ calcTotal() ? calcTotal() : 0 }}</span>
        </div>
        <div class="price">
          <span class="money">￥{{ calcMoney() }}</span>
          <span class="line"></span>
          <span class="plus">另需配送费￥4元</span>
        </div>
      </div>
      <div class="right on" v-if="calcMoney() >= 20" @click.stop="toPay">去结算</div>
      <div class="right" v-else @click.stop="toPay">{{ changeTxt() }}</div>
    </div>
    <div class="carts-mark" v-show="flag">
      <div class="carts-list">
        <div class="settings">
          <span class="txt">购物车</span>
          <span class="btn" @click.stop="_del">清空</span>
        </div>
        <div class="list" ref="ul_hook">
          <ul>
            <li class="item bd" v-for="food in changeGoods()">
              <div class="left">{{ food.name }}</div>
              <div class="right">
                <span class="price-wrap">
                  <span class="sign">￥</span>
                  <span class="price">{{ food.price }}</span>
                </span>
                <div class="btns-wrap">
                  <div class="btn-left">
                    <i class="icon icon-sub_circle" @click.stop="_sub(food, $event)"></i>
                    <span class="num">{{ food.cartNum }}</span>
                  </div>
                  <i class="icon icon-add_circle" @click.stop="_add(food, $event)"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template v-for="item in balls">
      <transition @before-enter="beforeDrop" @enter="drop" @after-enter="afterDrop" name="drop">
        <div class="ball-wrap" v-show="item.flag">
          <div class="inner"></div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
  import BScoll from 'better-scroll';
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        flag: false,
        balls: [
          {flag: false},
          {flag: false},
          {flag: false},
          {flag: false},
          {flag: false}
        ],
        dropBall: []
      };
    },
    computed: mapState(['goods', 'cartoonObj']),
    methods: {
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let temp = this.balls[count];
          let rect = this.cartoonObj.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          if (temp.flag) {
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.querySelector('.inner');
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      drop(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        el.style.webkitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.querySelector('.inner');
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
        el.addEventListener('webkitTransitionEnd', done, false);
        el.addEventListener('transitionend', done, false);
        inner.addEventListener('webkitTransitionEnd', done, false);
        inner.addEventListener('transitionend', done, false);
      },
      afterDrop(el) {
        let ball = this.dropBall.shift();
        if (ball) {
          ball.flag = false;
          el.style.display = 'none';
        }
      },
      toggle() {
        if (this.changeGoods().length) {
          this.flag = !this.flag;
        }
      },
      changeTxt() {
        if (!this.calcMoney()) {
          return '￥20起送';
        } else {
          return '还差￥' + (20 - this.calcMoney()) + '起送';
        }
      },
      calcTotal() {
        let arr = this.changeGoods();
        let temp = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
          temp += arr[i].cartNum;
        }
        return temp;
      },
      calcMoney() {
        let arr = this.changeGoods();
        let temp = 0;
        for (let i = 0, len = arr.length; i < len; i++) {
          temp += arr[i].price * arr[i].cartNum;
        }
        return temp;
      },
      toPay() {
        if (this.calcMoney() >= 20) {
          window.alert('您将支付的餐费和配送费总计为￥' + (this.calcMoney() + 4));
        } else if (this.calcMoney() === 0) {
          window.alert('￥20起送');
        } else {
          window.alert('还差￥' + (20 - this.calcMoney()) + '起送');
        }
      },
      _sub(food, ev) {
        if (!ev._constructed) {
          return;
        }
        this.sub(food);
        if (!this.goods.length) {
          this.flag = !this.flag;
        }
      },
      _add(food, ev) {
        if (!ev._constructed) {
          return;
        }
        this.add(food);
      },
      _del() {
        this.del();
        this.flag = !this.flag;
      },
      changeGoods() {
        this.initScroll();
        return this.goods;
      },
      ...mapActions(['sub', 'add', 'del']),
      initScroll() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScoll(this.$refs.ul_hook, {
              click: true,
              protoType: 3
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      _drop() {
        for (let i = 0, len = this.balls.length; i < len; i++) {
          let temp = this.balls[i];
          if (!temp.flag) {
            temp.flag = true;
            this.dropBall.push(temp);
            return;
          }
        }
      }
    },
    watch: {
      cartoonObj: {
        handler(val, oldVal) {
          // 放到回调里的原因是进行性能处理
          this.$nextTick(() => {
            this._drop();
          });
        },
        deep: true
      }
    }
  };
</script>

<style scoped lang="scss">
  .carts-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    .carts-box {
      position: relative;
      z-index: 1;
      display: flex;
      height: 48px;
      background: #141d27;
      .left {
        display: flex;
        align-items: center;
        flex: 1;
        padding-left: 12px;
        color: rgba(255, 255, 255, .4);
        &.on {
          color: #fff;
          .cart {
            background: rgb(0, 160, 220);
          }
          .num {
            position: absolute;
            right: -10px;
            top: -5px;
            line-height: 1.7;
            padding: 0 6px;
            font-size: 9px;
            border-radius: 20px;
            background: rgb(240, 20, 20);
            box-shadow: 0 2px 4px rgba(0, 0, 0, .4);
          }
        }
        .cart {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 44px;
          margin-bottom: 15px;
          font-size: 24px;
          border: 6px solid #141d27;
          border-radius: 50%;
          background: #2b343c;
        }
        .price {
          .money {
            margin-left: 12px;
            font-size: 16px;
            font-weight: bold;
          }
          .line {
            height: 25px;
            margin-left: 12px;
            border-left: 1px solid rgba(255, 255, 255, .1);
          }
          .plus {
            margin-left: 12px;
            font-size: 12px;
            color: rgba(255, 255, 255, .4);
          }
        }
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 105px;
        width: 105px;
        height: 100%;
        font-size: 12px;
        font-weight: bold;
        color: rgba(255, 255, 255, .4);
        background: #2b333b;
        &.on {
          color: #fff;
          background: #00b43c;
        }
      }
    }
    .carts-mark {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: blur(10px);
      background: rgba(7, 17, 27, .6);
      .carts-list {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding-bottom: 48px;
        box-sizing: border-box;
        background: #fff;
        .settings {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          padding: 0 18px;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
          background: #f3f5f7;
          .txt {
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .btn {
            font-size: 12px;
            color: rgb(0, 160, 220);
          }
        }
        .list {
          max-height: 218px;
          padding: 0 18px;
          overflow: hidden;
          .item {
            display: flex;
            align-items: center;
            height: 48px;
            &:last-child:after {
              display: none;
            }
            .left {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              flex: 1;
              line-height: 16px;
              font-size: 14px;
              font-weight: bold;
              word-break: break-all;
              overflow: hidden;
            }
            .right {
              display: flex;
              justify-content: flex-end;
              flex: 0 0 150px;
              width: 150px;
              .price-wrap {
                display: flex;
                align-items: center;
                color: rgb(240, 20, 20);
                .sign {
                  font-size: 10px;
                }
                .price {
                  font-size: 14px;
                  font-weight: bold;
                }
              }
              .btns-wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 68px;
                height: 24px;
                margin-left: 12px;
                font-size: 10px;
                color: rgb(147, 153, 159);
                .btn-left {
                  display: flex;
                  align-items: center;
                  .num {
                    width: 24px;
                    text-align: center;
                  }
                }
                .icon {
                  width: 24px;
                  height: 24px;
                  font-size: 24px;
                  color: rgb(0, 160, 220);
                }
              }
            }
          }
        }
      }
    }
    .ball-wrap {
      position: fixed;
      left: 32px;
      bottom: 22px;
      transition: all .4s cubic-bezier(.49, -.29, .75, .41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all .4s linear;
      }
    }
  }
</style>
