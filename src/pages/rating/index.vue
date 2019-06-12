<template>
  <div class="rating-wrap" ref="scroll">
    <div>
      <div class="rating-box">
        <div class="left-box">
          <div class="score">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="compare">{{'高于周边商家' + seller.rankRate + '%'}}</div>
        </div>
        <div class="right-box">
          <div class="item-box">
            <div class="text">服务态度</div>
            <div class="star-bar">
              <Star :score="seller.serviceScore" :size="18"></Star>
            </div>
          </div>
          <div class="item-box">
            <div class="text">就餐环境</div>
            <div class="star-bar">
              <Star :score="seller.foodScore" :size="18"></Star>
            </div>
          </div>
          <div class="item-box">
            <div class="text">送达时间</div>
            <div class="time">{{seller.deliveryTime + '分钟'}}</div>
          </div>
        </div>
      </div>
      <Divide></Divide>
      <div class="content-box">
        <Toggle :data="_obj" @toggle="handleToggle"></Toggle>
        <ul class="rating-list">
          <li class="item-box" v-for="(item, index) in _ratings" :key="index">
            <div class="img-box">
              <img class="img" :src="item.avatar" alt="头像">
            </div>
            <div class="info-box">
              <div class="name-bar">
                <span class="name">{{item.username}}</span>
                <span class="time">{{item.rateTime}}</span>
              </div>
              <div class="star-bar">
                <Star :score="item.score" :size="10"></Star>
                <span class="delivery">{{item.deliveryTime + '分钟送达'}}</span>
              </div>
              <p class="rating-bar" v-if="item.text">{{item.text}}</p>
              <div class="other-bar">
                <i :class="['iconfont', item.rateType ? 'icon-love' : 'icon-unlove']"></i>
                <ul class="text-list" v-if="item.recommend.length">
                  <li class="text-box" v-for="(_item, _index) in item.recommend" :key="_index">
                    <div class="text">{{_item}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    },
    ratings: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
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
            num: this.ratings.length
          },
          {
            text: '满意',
            type: 1,
            num: this.ratings.filter(item => item.rateType).length
          },
          {
            text: '不满意',
            type: 0,
            num: this.ratings.filter(item => !item.rateType).length
          }
        ]
      };
    },
    _ratings() {
      let arr = this.ratings.filter(item => {
        if (this.nowType === -1) {
          return true;
        }
        return item.rateType === this.nowType;
      });

      return this.isHasContent ? arr.filter(item => item.text) : arr;
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
    handleToggle({ nowType, isHasContent }) {
      this.nowType = nowType;
      this.isHasContent = isHasContent;
    }
  }
};
</script>

<style lang="scss" scoped>
.rating-wrap {
  height: calc(100vh - 223px);
  font-size: 12px;
  overflow: hidden;
  .rating-box {
    @include frow();
    height: 106px;
    .left-box {
      @include fcol();
      width: 138px;
      height: 100%;
      .score {
        font-size: 24px;
        color: $fsf01;
      }
      .text {
        margin-top: 6px;
      }
      .compare {
        margin-top: 8px;
        color: $fs9aa;
      }
    }
    .right-box {
      flex: 1;
      padding-left: 20px;
      border-left: 1px solid $bdeee;
      .item-box {
        @include frow(flex-start);
        &:nth-of-type(n + 2) {
          margin-top: 8px;
        }
        &:last-child {
          padding-bottom: 4px;
        }
        .text {
          margin-right: 12px;
        }
        .time {
          color: $fs9aa;
        }
      }
    }
  }
  .content-box {
    .rating-list {
      padding: 0 18px;
      border-top: 1px solid $bdeee;
      .item-box {
        @include frow(flex-start, flex-start);
        padding: 18px 0;
        &:nth-of-type(n + 2) {
          border-top: 1px solid $bdeee;
        }
        .img-box {
          width: 28px;
          height: 28px;
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
        .info-box {
          flex: 1;
          margin-left: 12px;
          .name-bar {
            @include frow(space-between);
            .time {
              color: $fs9aa;
            }
          }
          .star-bar {
            @include frow(flex-start);
            margin-top: 4px;
            .delivery {
              margin-left: 6px;
              color: $fs9aa;
            }
          }
          .rating-bar {
            line-height: 1.5;
            text-align: justify;
            margin-top: 6px;
          }
          .other-bar {
            @include frow(flex-start, flex-start);
            color: $fs9aa;
            .iconfont {
              margin: 10px 8px 0 0;
              &.icon-love {
                color: $fs00a;
              }
            }
            .text-list {
              flex: 1;
              .text-box {
                @include frow(flex-start);
                display: inline-flex;
                max-width: 52px;
                height: 18px;
                margin: 8px 8px 0 0;
                padding: 0 6px;
                border: 1px solid $bdeee;
                overflow: hidden;
                .text {
                  @include dot();
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
