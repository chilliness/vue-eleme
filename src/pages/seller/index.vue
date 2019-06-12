<template>
  <div class="seller-wrap" ref="scroll">
    <div>
      <div class="seller-box">
        <div class="top-box">
          <h2 class="name">{{seller.name}}</h2>
          <div class="plus-box">
            <div class="star-bar">
              <Star :size="18" :score="seller.score"></Star>
            </div>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">{{'月售' + seller.sellCount + '单'}}</span>
          </div>
          <div class="collect-box" @click="seller.isCollect = !seller.isCollect">
            <i class="iconfont icon-collect" :class="{active: seller.isCollect}"></i>
            <span class="text">{{!seller.isCollect ? '收藏' : '取消'}}</span>
          </div>
        </div>
        <ul class="bottom-box">
          <li class="item-box">
            <div class="text">起送价</div>
            <div class="num-box">
              <span class="num">{{seller.minPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="item-box">
            <div class="text">商家配送</div>
            <div class="num-box">
              <span class="num">{{seller.deliveryPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="item-box">
            <div class="text">平均配送时间</div>
            <div class="num-box">
              <span class="num">{{seller.deliveryTime}}</span>
              <span>元</span>
            </div>
          </li>
        </ul>
      </div>
      <Divide></Divide>
      <div class="content-box">
        <h3 class="caption">公告与互动</h3>
        <p class="intro">{{seller.bulletin}}</p>
        <ul class="list-box">
          <li class="item-box" v-for="(item, index) in seller.supports" :key="index">
            <Icon :type="item.type"></Icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <Divide></Divide>
      <div class="content-box">
        <h3 class="caption">商家实景</h3>
        <div class="pic-bar" ref="scrollX">
          <ul class="pic-list">
            <li class="item-box" v-for="(item, index) in seller.pics" :key="index">
              <img class="img" :src="item" alt="图片">
            </li>
          </ul>
        </div>
      </div>
      <Divide></Divide>
      <div class="content-box">
        <h3 class="caption">商家信息</h3>
        <ul class="list-box">
          <li class="item-box" v-for="(item, index) in seller.infos" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Seller',
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    this.handleInitScroll('scroll');
    this.handleInitScroll('scrollX', { scrollX: true });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.seller-wrap {
  height: calc(100vh - 223px);
  font-size: 12px;
  overflow: hidden;
  .seller-box {
    padding: 18px;
    .top-box {
      position: relative;
      .name {
        @include frow(flex-start);
        font-size: 14px;
        font-weight: bold;
      }
      .plus-box {
        @include frow(flex-start);
        margin-top: 8px;
        .text {
          margin-left: 10px;
        }
      }
      .collect-box {
        position: absolute;
        right: 0;
        top: 0;
        @include fcol();
        width: 40px;
        .icon-collect {
          font-size: 24px;
          color: $fs9aa;
          &.active {
            color: $fsf01;
          }
        }
        .text {
          margin-top: 4px;
        }
      }
    }
    .bottom-box {
      @include frow(space-between);
      margin-top: 18px;
      padding-top: 18px;
      border-top: 1px solid $bdeee;
      .item-box {
        @include fcol(space-between);
        flex: 1;
        height: 38px;
        &:nth-of-type(n + 2) {
          border-left: 1px solid $bdeee;
        }
        .text {
          color: $fs9aa;
        }
        .num-box {
          margin-top: 4px;
          .num {
            font-size: 24px;
          }
        }
      }
    }
  }
  .content-box {
    padding: 18px 18px 0;
    .caption {
      font-size: 14px;
      font-weight: bold;
    }
    .intro {
      line-height: 2;
      text-align: justify;
      padding-top: 8px;
      color: $fsf01;
    }
    .list-box {
      margin-top: 16px;
      .item-box {
        @include frow(flex-start);
        line-height: 1.5;
        padding: 16px 0;
        border-top: 1px solid $bdeee;
        .text {
          flex: 1;
          @include dot();
        }
      }
    }
    .pic-bar {
      padding: 18px 0;
      overflow: hidden;
    }
    .pic-list {
      display: inline-table;
      white-space: nowrap;
      .item-box {
        display: inline-table;
        width: 120px;
        height: 90px;
        &:nth-of-type(n + 2) {
          margin-left: 6px;
        }
        .img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
