<template>
  <div class="goods-wrap">
    <div class="nav-list" ref="left_hook">
      <ul class="list">
        <li class="item" :class="{ on: curPos <= arr[index] && curPos > arr[index + 1] }" v-for="(item, index) in goods"
            @click="toPos(index)">
          <span class="text">
            <icons class="ic" :types="item.type" v-show="item.type != -1"></icons>
            <span class="txt">{{ item.name }}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="list-cont" ref="right_hook">
      <ul class="list">
        <li class="item" v-for="item in goods">
          <h2 class="items-title">{{ item.name }}</h2>
          <ul class="items-wrap">
            <li class="items bd" v-for="food in item.foods" @click="show(food)">
              <div class="img-wrap">
                <img class="img" :src="food.image" width="57" height="57" alt="">
              </div>
              <div class="info-wrap">
                <h3 class="title">{{ food.name }}</h3>
                <p class="desc" v-if="food.description">{{ food.description }}</p>
                <p class="feed">
                  <span class="txt">月售{{ food.sellCount ? food.sellCount : 0 }}份</span>
                  <span class="txt">好评率{{ food.rating ? food.rating : 0 }}%</span>
                </p>
                <div class="price">
                  <span class="now">
                    <b class="sign">￥</b>
                    <span class="num">{{ food.price }}</span>
                  </span>
                  <span class="old" v-if="food.oldPrice">
                    <b class="sign">￥</b>
                    <span class="num">{{ food.oldPrice }}</span>
                  </span>
                </div>
              </div>
              <btns class="btn" :food="food"></btns>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import icons from '../../components/icons/icons.vue';
  import btns from '../../components/btns/btns.vue';
  import BScroll from 'better-scroll';
  import {mapActions} from 'vuex';

  export default {
    data() {
      return {
        goods: [],
        arr: [],
        curPos: 0,
        arrList: []
      };
    },
    created() {
      this.initData();
    },
    methods: {
      ...mapActions(['show']),
      initData() {
        this.$http.get('api/goods')
          .then((res) => {
            res = res.data;
            if (res.errno === 0) {
              this.goods = res.data;
              // 为每一个商品添加购物车数量
              this.goods.forEach((item) => {
                 item.foods.forEach((food) => {
                    this.$set(food, 'cartNum', 0);
                 });
              });
              this.initScroll();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      initScroll() {
        this.$nextTick(() => {
          // 初始化左菜单滚动
          if (!this.scrollLeft) {
            this.scrollLeft = new BScroll(this.$refs.left_hook, {
              click: true,
              probeType: 3
            });
          } else {
            this.scrollLeft.refresh();
          }
          // 初始化右列表内容
          if (!this.scrollRight) {
            this.scrollRight = new BScroll(this.$refs.right_hook, {
              click: true,
              probeType: 3
            });
            // 计算每一个列表项所在区间
            let lis = this.$refs.right_hook.children[0].children;
            for (let i = 0, len = lis.length; i < len; i++) {
              // 存储每一个列表项
              this.arrList.push(lis[i]);
              if (i === 0) {
                this.arr.push(-lis[i].clientHeight);
              } else {
                this.arr.push(-lis[i].clientHeight + this.arr[i - 1]);
              }
            }
            // 在列表项所在区间第一位放入无穷大
            this.arr.unshift(Infinity);
            // 将列表项所在区间最后一位替换为负无穷大，防止最后一栏只有一项时的bug
            this.arr.splice(this.arr.length - 1, 1, -Infinity);
          } else {
            this.scrollRight.refresh();
          }
          // 监听右列表滚动
          this.scrollRight.on('scroll', (pos) => {
            this.curPos = pos.y;
          });
        });
      },
      toPos(index) {
        this.scrollRight.scrollToElement(this.arrList[index], 100);
      }
    },
    components: {
      icons,
      btns
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/scss/mixin";

  .goods-wrap {
    position: absolute;
    left: 0;
    top: 175px;
    right: 0;
    bottom: 48px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .nav-list {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .item {
        position: relative;
        display: flex;
        align-items: center;
        height: 54px;
        padding: 0 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        &:not(:last-child):after {
          position: absolute;
          left: 12px;
          bottom: -1px;
          content: "";
          width: 56px;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
        }
        &.on {
          font-weight: bold;
          overflow: hidden;
          background: #fff;
        }
        .text {
          line-height: 1.2;
          .ic {
            transform: translateY(1px);
          }
        }
      }
    }
    .list-cont {
      position: relative;
      flex: 1;
      .item {
        .items-title {
          display: flex;
          align-items: center;
          height: 26px;
          padding-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
          border-left: 2px solid #d9dde1;
          background: #f3f5f7;
        }
        .items-wrap {
          padding: 0 18px;
          .items {
            position: relative;
            display: flex;
            padding: 18px 0;
            &:last-child:after {
              display: none;
            }
            .img-wrap {
              width: 57px;
              height: 57px;
              .img {
                border-radius: 2px;
              }
            }
            .info-wrap {
              margin-left: 10px;
              .title {
                font-size: 14px;
                font-weight: bold;
                color: rgb(7, 17, 27);
              }
              .desc {
                line-height: 1.2;
                margin-top: 8px;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
              .feed {
                margin-top: 8px;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
              .price {
                margin-top: 8px;
                font-size: 0;
                .sign {
                  font-size: 10px;
                }
                .num {
                  font-weight: bold;
                }
                .now {
                  color: rgb(240, 20, 20);
                  .num {
                    font-size: 14px;
                  }
                }
                .old {
                  margin-left: 8px;
                  font-size: 10px;
                  color: rgb(147, 153, 159);
                  text-decoration: line-through;
                }
              }
            }
            .btn {
              position: absolute;
              right: 0;
              bottom: 18px;
            }
          }
        }
      }
    }
  }
</style>
