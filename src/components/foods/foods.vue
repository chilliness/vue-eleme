<template>
  <div class="foods-wrap" ref="scroll_hook">
    <div>
      <header class="head">
        <div class="img-wrap">
          <img class="img" :src="food.image" alt="">
          <i class="icon icon-arrow_left" @click="hide"></i>
        </div>
        <div class="info-wrap">
          <h2 class="title">{{ food.name }}</h2>
          <div class="feed">
            <span class="txt">月售{{ food.sellCount ? food.sellCount : 0 }}份</span>
            <span class="txt">好评率{{ food.rating ? food.rating : 0 }}%</span>
          </div>
          <div class="price">
            <span class="now">
              <b class="sign">￥</b>
              <span class="num">{{ food.price }}</span>
            </span>
            <span class="old" v-show="food.oldPrice">
              <b class="sign">￥</b>
              <span class="num">{{ food.oldPrice }}</span>
            </span>
          </div>
        </div>
        <btns class="btn" :food="food" v-if="food.cartNum > 0"></btns>
        <span class="btn btn-add" v-else @click="_add(food, $event)">加入购物车</span>
      </header>
      <template v-if="food.info">
        <splits></splits>
        <div class="info-wrap">
          <h3 class="title">商品介绍</h3>
          <p class="intr">{{ food.info }}</p>
        </div>
      </template>
      <splits></splits>
      <div class="ratings-wrap">
        <div class="info-wrap">
          <h3 class="title">商品评价</h3>
          <div class="feed-box">
            <feeds @onlyHave="toggle" :txts="txtArr"></feeds>
          </div>
        </div>
        <ul class="ratings-list">
          <li class="item bd" v-for="item in ratings">
            <div class="top">
              <span class="time">{{ item.rateTime | formatDate }}</span>
              <span class="user">
                <span class="accout">{{ item.username }}</span>
                <img class="avatar" :src="item.avatar" width="12" height="12" alt="">
              </span>
            </div>
            <div class="bot">
              <i class="icon" :class="icon[item.rateType]"></i>
              <span class="txt">{{ item.text }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import splits from '../../components/splits/splits.vue';
  import feeds from '../../components/feeds/feeds.vue';
  import btns from '../../components/btns/btns.vue';
  import {formatDate} from '../../common/js/util';
  import BScroll from 'better-scroll';
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        icon: ['icon-thumb_up', 'icon-thumb_down'],
        curIndex: 0,
        flag: false
      };
    },
    computed: {
      ...mapState(['food']),
      ratings() {
        let arr = this.food.ratings.filter((item) => {
          if (!this.curIndex) {
            return item;
          } else {
            return item.rateType === this.curIndex - 1;
          }
        });
        let temp = arr.filter((item) => {
          if (!this.flag) {
            return item;
          } else {
            return item.text.length > 0;
          }
        });
        return temp;
      },
      txtArr() {
        let all = this.food.ratings.length;
        let good = this.food.ratings.filter((item) => {
          return item.rateType === 0;
        }).length;
        let bad = this.food.ratings.filter((item) => {
          return item.rateType === 1;
        }).length;
        return [
          {title: '全部', num: all},
          {title: '推荐', num: good},
          {title: '吐槽', num: bad}
        ];
      }
    },
    mounted() {
      this.initScroll();
    },
    methods: {
      ...mapActions(['hide', 'add', 'cartoon']),
      _add(food, ev) {
        if (!ev._constructed) {
          return;
        }
        // 解决小球运动bug
        setTimeout(() => {
          this.add(food);
        }, 30);
        this.cartoon(ev.target);
      },
      toggle(index, bool) {
        this.curIndex = index;
        this.flag = bool;
        this.initScroll();
      },
      initScroll() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.scroll_hook, {
              click: true,
              probeType: 3
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    filters: {
      formatDate
    },
    components: {
      splits,
      feeds,
      btns
    }
  };
</script>

<style scoped lang="scss">
  .foods-wrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 48px;
    z-index: 1;
    overflow: hidden;
    background: #fff;
    .head {
      position: relative;
      .img-wrap {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        .img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .icon {
          position: absolute;
          left: 10px;
          top: 15px;
          font-size: 24px;
          color: #fff;
        }
      }
      .info-wrap {
        padding: 18px;
        .title {
          font-size: 14px;
          font-weight: bold;
          color: rgb(7, 17, 27);
        }
        .feed {
          margin-top: 8px;
          font-size: 0;
          color: rgb(147, 153, 159);
          .txt {
            font-size: 10px;
            &:last-child {
              margin-left: 12px;
            }
          }
        }
        .price {
          margin-top: 18px;
          font-size: 0;
          .sign {
            font-size: 10px;
          }
          .now {
            color: rgb(240, 20, 20);
            .num {
              font-size: 14px;
              font-weight: bold;
            }
          }
          .old {
            margin-left: 12px;
            text-decoration: line-through;
            color: rgb(147, 153, 159);
            .num {
              font-size: 10px;
            }
          }
        }
      }
      .btn {
        position: absolute;
        right: 18px;
        bottom: 18px;
      }
      .btn-add {
        width: 74px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: #fff;
        border-radius: 24px;
        background: rgb(0, 160, 220);
      }
    }
    .info-wrap {
      padding: 18px 18px 0;
      .title {
        font-size: 14px;
        font-weight: bold;
        color: rgb(7, 17, 27);
      }
      .intr {
        line-height: 2;
        text-align: justify;
        font-size: 12px;
        color: rgb(77, 85, 93);
        padding: 6px 8px 36px;
      }
    }
    .ratings-wrap {
      .feed-box {
        margin: 0 -18px;
      }
      .ratings-list {
        padding: 0 18px;
        border-top: 1px solid rgba(147, 153, 159, .2);
        .item {
          padding: 16px 0;
          &:last-child:after {
            display: none;
          }
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 1.2;
            font-size: 10px;
            color: rgb(147, 153, 159);
            .user {
              display: flex;
              align-items: center;
              .avatar {
                margin-left: 6px;
                border-radius: 50%;
              }
            }
          }
          .bot {
            display: flex;
            font-size: 12px;
            margin-top: 6px;
            .icon {
              line-height: 1.3;
              &.icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              &.icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }
            .txt {
              line-height: 1.3;
              margin-left: 4px;
              color: rgb(7, 17, 27);
            }
          }
        }
      }
    }
  }
</style>
