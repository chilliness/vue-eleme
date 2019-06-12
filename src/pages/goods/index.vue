<template>
  <div class="goods-wrap">
    <div class="left-content" ref="scrollLeft">
      <ul class="list-box">
        <li class="item-box" :class="{active: nowIndex === index}" v-for="(item, index) in goods" :key="index" @click="handleSelect(index)">
          <div class="text-box">
            <Icon :type="item.type" size v-if="item.type > -1"></Icon>
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="right-content" ref="scrollRight">
      <div class="list-box">
        <div class="item-box" v-for="(item, index) in goods" :key="index" ref="box">
          <h3 class="caption">{{item.name}}</h3>
          <ul class="_list-box">
            <li class="_item-box" v-for="(_item, _index) in item.foods" :key="_index" @click="handleShowFood(_item)">
              <div class="img-box">
                <img class="img" :src="_item.icon" alt="图片">
              </div>
              <div class="info-box">
                <h4 class="title">{{_item.name}}</h4>
                <div class="desc" v-if="_item.description">{{_item.description}}</div>
                <div class="sale">
                  <span class="text">{{'月售卖' + _item.sellCount + '份'}}</span>
                  <span class="text">{{'好评率' + _item.rating + '%'}}</span>
                </div>
                <div class="price">
                  <span class="text now">
                    <span>￥</span>
                    <span class="num">{{_item.price}}</span>
                  </span>
                  <span class="text old" v-if="_item.oldPrice">{{'￥' + _item.oldPrice}}</span>
                </div>
              </div>
              <div class="btn-bar" @click.stop>
                <Btn :food="_item"></Btn>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="food-mark" :class="{show: food.isShow}" ref="scrollFood">
      <div>
        <div class="pic-box" :style="{backgroundImage: 'url(' + food.image +')'}" v-if="food.image">
          <i class="iconfont icon-left-arrow" @click="food.isShow = false"></i>
        </div>
        <div class="name-box">
          <h2 class="name">{{food.name}}</h2>
          <div class="sale">
            <span class="text">{{'月售卖' + food.sellCount + '份'}}</span>
            <span class="text">{{'好评率' + food.rating + '%'}}</span>
          </div>
          <div class="price">
            <span class="text now">
              <span>￥</span>
              <span class="num">{{food.price}}</span>
            </span>
            <span class="text old" v-if="food.oldPrice">{{'￥' + food.oldPrice}}</span>
          </div>
          <div class="btn-bar">
            <Btn :food="food"></Btn>
          </div>
        </div>
        <Divide></Divide>
        <div class="content-box">
          <h3 class="caption">商品介绍</h3>
          <p class="intro">{{food.info || '这个家伙很懒，什么都没留下'}}</p>
        </div>
        <Divide></Divide>
        <div class="content-box">
          <Toggle :data="_obj" @toggle="handleToggle"></Toggle>
          <ul class="rating-list">
            <li class="item-box" v-for="(item, index) in _ratings" :key="index">
              <div class="name-bar">
                <span class="time">{{item.rateTime}}</span>
                <div class="right-box">
                  <span class="name">{{item.username}}</span>
                  <div class="img-box">
                    <img class="img" :src="item.avatar" alt="头像">
                  </div>
                </div>
              </div>
              <div class="text-bar">
                <i :class="['iconfont', item.rateType ? 'icon-love' : 'icon-unlove']"></i>
                <p class="text">{{item.text}}</p>
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
  name: 'Goods',
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      food: { ratings: [] },
      nowIndex: 0,
      nowType: -1,
      isHasContent: false
    };
  },
  computed: {
    _obj() {
      return {
        nowType: this.nowType,
        isHasContent: this.isHasContent,
        list: [
          {
            text: '全部',
            type: -1,
            num: this.food.ratings.length
          },
          {
            text: '推荐',
            type: 1,
            num: this.food.ratings.filter(item => item.rateType).length
          },
          {
            text: '吐槽',
            type: 0,
            num: this.food.ratings.filter(item => !item.rateType).length
          }
        ]
      };
    },
    _ratings() {
      let arr = this.food.ratings.filter(item => {
        if (this.nowType === -1) {
          return true;
        }
        return item.rateType === this.nowType;
      });

      return this.isHasContent ? arr.filter(item => item.text) : arr;
    }
  },
  mounted() {
    this.handleInitScroll('scrollLeft');
    this.handleInitScroll('scrollRight');
    this.handleInitScroll('scrollFood');
  },
  methods: {
    handleInitScroll(
      ref,
      config = { scrollY: true, click: true, probeType: 3 }
    ) {
      this.$nextTick(() => {
        if (!this[ref]) {
          this[ref] = new this.$BScroll(this.$refs[ref], config);

          if (ref === 'scrollRight') {
            let arr = [];

            this[ref].on('scroll', pos => {
              if (!arr.length) {
                this.$refs.box.forEach(item => arr.push(-item.offsetTop));
                arr.push(-Infinity);
              }

              this.nowIndex = Math.max(
                0,
                arr.findIndex(item => item < pos.y) - 1
              );
            });
          }
        } else {
          this[ref].refresh();
        }
      });
    },
    handleShowFood(food) {
      this.nowType = -1;
      this.isHasContent = false;
      this.scrollFood && this.scrollFood.scrollTo(0, 0, 0);
      this.food = Object.assign(food, { isShow: true });
    },
    handleToggle({ nowType, isHasContent }) {
      this.nowType = nowType;
      this.isHasContent = isHasContent;
    },
    handleSelect(index) {
      if (this.$refs.box[index] && this.scrollRight) {
        this.scrollRight.scrollToElement(this.$refs.box[index], 300);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-wrap {
  @include frow(flex-start, stretch);
  height: calc(100vh - 223px);
  font-size: 12px;
  overflow: hidden;
  .left-content {
    width: 80px;
    overflow: hidden;
    background: $bgf3f;
    .list-box {
      .item-box {
        position: relative;
        @include frow(flex-start);
        height: 54px;
        padding: 0 12px;
        &.active {
          font-weight: bold;
          background: $bgwhite;
          &:after,
          & + .item-box:after {
            display: none;
          }
        }
        &:nth-of-type(n + 2) {
          &:after {
            content: '';
            position: absolute;
            left: 12px;
            top: 0;
            right: 12px;
            border-top: 1px solid $bdeee;
          }
        }
      }
    }
  }
  .right-content {
    position: relative;
    flex: 1;
    overflow: hidden;
    .caption {
      @include frow(flex-start);
      height: 30px;
      padding-left: 12px;
      font-size: 14px;
      color: $fs9aa;
      border-left: 2px solid $bdeee;
      background: $bgf3f;
    }
    ._list-box {
      padding: 0 18px;
    }
    ._item-box {
      position: relative;
      @include frow(flex-start, stretch);
      padding: 18px 0;
      &:nth-of-type(n + 2) {
        border-top: 1px solid $bdeee;
      }
      .img-box {
        width: 80px;
        height: 60px;
        border-radius: 3px;
        overflow: hidden;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .info-box {
        margin-left: 8px;
        .title {
          font-size: 14px;
          font-weight: bold;
        }
        .desc,
        .sale {
          line-height: 1.2;
          margin-top: 8px;
          color: $fs9aa;
          .text:nth-of-type(n + 2) {
            margin-left: 8px;
          }
        }
        .price {
          @include frow(flex-start, flex-start);
          height: 18px;
          margin-top: 8px;
          .now {
            color: $fsf01;
            .num {
              font-size: 14px;
              font-weight: bold;
            }
          }
          .old {
            margin-left: 8px;
            color: $fs9aa;
            text-decoration: line-through;
          }
        }
      }
      .btn-bar {
        position: absolute;
        right: 0;
        bottom: 8px;
      }
    }
  }
  .food-mark {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    overflow: hidden;
    transform: translate3d(100%, 0, 0);
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    background: $bgwhite;
    &.show {
      transform: translate3d(0, 0, 0);
    }
    .pic-box {
      position: relative;
      background: no-repeat center;
      background-size: cover;
      &:before {
        content: '';
        float: left;
        padding-top: 100%;
      }
      &:after {
        content: '';
        display: block;
        clear: both;
      }
      .iconfont {
        position: absolute;
        left: 10px;
        top: 15px;
        font-size: 32px;
        color: $fs00a;
      }
    }
    .name-box {
      position: relative;
      padding: 18px;
      .name {
        font-size: 14px;
        font-weight: bold;
      }
      .sale {
        margin-top: 8px;
        .text {
          color: $fs9aa;
          &:nth-of-type(n + 2) {
            margin-left: 12px;
          }
        }
      }
      .price {
        margin-top: 18px;
        color: $fs9aa;
        .now {
          color: $fsf01;
          .num {
            font-size: 14px;
            font-weight: bold;
          }
        }
        .old {
          margin-left: 8px;
          text-decoration: line-through;
        }
      }
      .btn-bar {
        position: absolute;
        right: 18px;
        bottom: 18px;
      }
    }
    .content-box {
      .caption {
        padding: 18px 18px 0;
        font-size: 14px;
        font-weight: bold;
      }
      .intro {
        line-height: 2;
        text-align: justify;
        padding: 6px 18px 18px;
        color: $fs9aa;
      }
      .rating-list {
        padding: 0 18px;
        border-top: 1px solid $bdeee;
        .item-box {
          padding: 16px 0;
          &:nth-of-type(n + 2) {
            border-top: 1px solid $bdeee;
          }
          .name-bar {
            @include frow(space-between);
            color: $fs9aa;
            .right-box {
              @include frow();
              .img-box {
                width: 16px;
                height: 16px;
                margin-left: 6px;
                border: 1px solid $bdeee;
                border-radius: 50%;
                overflow: hidden;
                background: url(./img/avatar.png) no-repeat center;
                background-size: contain;
                .img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          .text-bar {
            @include frow(flex-start, flex-start);
            margin-top: 6px;
            .iconfont {
              color: $fs9aa;
              &.icon-love {
                color: $fs00a;
              }
            }
            .text {
              line-height: 1.5;
              text-align: justify;
              margin-left: 6px;
            }
          }
        }
      }
    }
  }
}
</style>
