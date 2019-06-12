<template>
  <div class="nav-wrap">
    <div class="header-bar">
      <template v-if="seller.supports">
        <div class="bg-box" :style="{backgroundImage: 'url(' + seller.avatar + ')'}"></div>
        <div class="top-box">
          <div class="img-box">
            <img class="img" :src="seller.avatar" alt="logo">
          </div>
          <div class="intro-box">
            <h2 class="item-box name">
              <i class="icon"></i>
              <span>{{seller.name}}</span>
            </h2>
            <div class="item-box delivery">{{seller.description + ' / ' + seller.deliveryTime + '分钟送达'}}</div>
            <div class="item-box activity" v-if="seller.supports[0]">
              <Icon :type="seller.supports[0].type"></Icon>
              <span>{{seller.supports[0].description}}</span>
            </div>
          </div>
          <div class="btn-more" v-if="seller.supports" @click="isShow = true">
            <span class="text">{{seller.supports.length + '个'}}</span>
            <i class="iconfont icon-right-arrow"></i>
          </div>
        </div>
      </template>
      <div class="bottom-box">
        <i class="icon"></i>
        <div class="text-bar" v-if="seller.bulletin">
          <div class="text-box">
            <div class="text">{{seller.bulletin}}</div>
            <div class="text">{{seller.bulletin}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-bar">
      <a class="item-box" :class="{active: $route.name === item.name}" v-for="(item, index) in nav" :key="index" @click="$router.push({name: item.name})">{{item.text}}</a>
    </div>
    <div class="mark-box" :class="{show: isShow}">
      <div class="content-outer" ref="scrollMark">
        <div>
          <h3 class="name">{{seller.name}}</h3>
          <div class="star-bar">
            <Star :score="seller.score" :size="24"></Star>
          </div>
          <div class="content-box">
            <div class="caption">
              <i class="line"></i>
              <span class="text">优惠信息</span>
              <i class="line"></i>
            </div>
            <ul class="list-box">
              <li class="item-box" v-for="(item, index) in seller.supports" :key="index">
                <Icon :type="item.type"></Icon>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
          </div>
          <div class="content-box">
            <div class="caption">
              <i class="line"></i>
              <span class="text">商家公告</span>
              <i class="line"></i>
            </div>
            <p class="intro">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <i class="iconfont icon-close" @click="isShow = false"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      nav: [
        { name: 'goods', text: '商品' },
        { name: 'rating', text: '评价' },
        { name: 'seller', text: '商家' }
      ],
      isShow: false
    };
  },
  mounted() {
    this.handleInitScroll('scrollMark');
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
.nav-wrap {
  font-size: 14px;
  .header-bar {
    position: relative;
    color: $fswhite;
    overflow: hidden;
    .bg-box {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      filter: blur(1px);
      background: no-repeat center;
      background-size: cover;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(7, 17, 27, 0.5);
      }
    }
    .top-box {
      position: relative;
      z-index: 1;
      display: flex;
      height: 106px;
      padding: 24px 0 0 24px;
      box-sizing: border-box;
      .img-box {
        width: 64px;
        height: 64px;
        border-radius: 3px;
        overflow: hidden;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .intro-box {
        margin-left: 16px;
        font-size: 12px;
        .item-box {
          @include frow(flex-start);
        }
        .name {
          margin-top: 2px;
          font-size: 16px;
          font-weight: bold;
          .icon {
            width: 30px;
            height: 18px;
            margin-right: 6px;
            background: url(./img/brand.png) no-repeat center;
            background-size: contain;
          }
        }
        .delivery {
          margin-top: 8px;
        }
        .activity {
          margin-top: 10px;
        }
      }
      .btn-more {
        position: absolute;
        right: 12px;
        bottom: 15px;
        @include frow();
        padding: 7px 10px;
        border-radius: 50px;
        background: rgba(0, 0, 0, 0.2);
        .text {
          margin-right: 2px;
        }
        .iconfont {
          font-size: 12px;
        }
      }
    }
    .bottom-box {
      position: relative;
      z-index: 1;
      @include frow(flex-start);
      height: 28px;
      padding: 0 12px;
      font-size: 12px;
      background: rgba(7, 17, 27, 0.2);
      .icon {
        width: 22px;
        height: 12px;
        margin-right: 12px;
        background: url(./img/bulletin.png) no-repeat center;
        background-size: contain;
      }
      .text-bar {
        flex: 1;
        overflow: hidden;
        .text-box {
          display: inline-table;
          white-space: nowrap;
          animation: anim-marquee 30s 0.5s linear infinite;
          .text {
            display: inline-table;
            padding-right: 100px;
          }
        }
      }
    }
  }
  .nav-bar {
    @include frow(space-between);
    border-bottom: 1px solid $bdeee;
    .item-box {
      @include frow();
      flex: 1;
      height: 40px;
      &.active {
        color: $fsf01;
      }
    }
  }
  .mark-box {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    font-size: 12px;
    color: $fswhite;
    overflow: hidden;
    backdrop-filter: blur(10px);
    transform: translate3d(0, -100%, 0);
    background: rgba(7, 17, 27, 0.8);
    &.show {
      animation: anim-drop 0.5s cubic-bezier(0.21, 0.2, 0.65, 0.1) both;
    }
    .content-outer {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 70px;
      overflow: hidden;
      .name {
        text-align: center;
        padding-top: 64px;
        font-size: 16px;
        color: $fswhite;
      }
      .star-bar {
        margin-top: 16px;
      }
      .content-box {
        margin: 0 36px;
        padding-top: 28px;
        .caption {
          @include frow();
          padding-bottom: 24px;
          .text {
            padding: 0 12px;
            font-size: 14px;
          }
          .line {
            flex: 1;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }
        }
        .item-box {
          @include frow(flex-start);
          margin-top: 12px;
          .text {
            flex: 1;
            @include dot();
          }
        }
        .intro {
          line-height: 2;
          text-align: justify;
        }
      }
    }
    .iconfont {
      position: absolute;
      left: 50%;
      bottom: 20px;
      font-size: 32px;
      color: rgba(255, 255, 255, 0.5);
      transform: translate3d(-50%, 0, 0);
    }
  }
}

@keyframes anim-marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes anim-drop {
  0% {
    transform: translate3d(0, -100%, 0);
  }
  60% {
    transform: translate3d(0, 0, 0);
  }
  80% {
    transform: translate3d(0, -20%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
