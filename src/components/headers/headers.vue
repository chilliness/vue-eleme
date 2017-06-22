<template>
  <div class="headers-wrap">
    <header class="header-box">
      <div class="top">
        <div class="up">
          <div class="img-wrap">
            <img class="avatar" width="64" height="64" :src="seller.avatar" alt="">
          </div>
          <div class="right">
            <div class="title">
              <i class="icon"></i>
              <span class="txt">{{ seller.name }}</span>
            </div>
            <div class="desc">{{ seller.description }} / {{ seller.deliveryTime }}分钟送达</div>
            <div class="info" v-if="seller.supports">
              <icons :types="seller.supports[0].type"></icons>
              <span class="txt">{{ seller.supports[0].description }}</span>
            </div>
          </div>
          <div class="btn" v-if="seller.supports" @click="markFlag = !markFlag">
            <span class="num">{{ seller.supports.length }}个</span>
            <i class="icon icon-arrow_right"></i>
          </div>
        </div>
        <div class="down">
          <i class="icon"></i>
          <div class="txt">{{ seller.bulletin }}</div>
          <i class="btn icon-arrow_right" @click="markFlag = !markFlag"></i>
        </div>
      </div>
      <nav class="nav">
        <router-link tag="span" :to="{ name: 'goods' }" class="item">商品</router-link>
        <router-link tag="span" :to="{ name: 'ratings' }" class="item">评价</router-link>
        <router-link tag="span" :to="{ name: 'sellers' }" class="item">商家</router-link>
      </nav>
      <img class="bg" :src="seller.avatar" alt="">
    </header>
    <transition name="fade">
      <div class="mark-wrap" v-if="markFlag">
        <div class="main">
          <h2 class="title">{{ seller.name }}</h2>
          <stars class="star" :sizes="48" :scores="seller.score"></stars>
          <div class="info-wrap">
            <div class="info-title">
              <span class="line"></span>
              <span class="txt">优惠信息</span>
              <span class="line"></span>
            </div>
            <ul class="list">
              <li class="item" v-for="item in seller.supports">
                <icons :sizes="32" :types="item.type"></icons>
                <span class="txt">{{ item.description }}</span>
              </li>
            </ul>
          </div>
          <div class="info-wrap">
            <div class="info-title">
              <span class="line"></span>
              <span class="txt">商家公告</span>
              <span class="line"></span>
            </div>
            <p class="intr">{{ seller.bulletin }}</p>
          </div>
          <i class="btn-close icon-close" @click="markFlag = !markFlag"></i>
        </div>
      </div>
    </transition>
    <transition name="swipe">
      <foods v-if="seen"></foods>
    </transition>
  </div>
</template>

<script>
  import icons from '../../components/icons/icons.vue';
  import stars from '../../components/stars/stars.vue';
  import foods from '../../components/foods/foods.vue';
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        seller: {},
        markFlag: false
      };
    },
    computed: {
      ...mapState(['seen'])
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        this.$http.get('api/seller')
          .then((res) => {
            res = res.data;
            if (res.errno === 0) {
              this.seller = res.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    components: {
      icons,
      stars,
      foods
    }
  };
</script>

<style scoped lang="scss">
  @import '../../common/scss/mixin';

  .headers-wrap {
    position: relative;
    height: 174px;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
    background: rgba(0, 0, 0, .5);
    .top {
      height: 134px;
      .up {
        position: relative;
        display: flex;
        align-items: center;
        padding: 24px 0 18px 24px;
        .img-wrap {
          width: 64px;
          height: 64px;
          .avatar {
            border-radius: 2px;
          }
        }
        .right {
          color: #fff;
          padding-left: 16px;
          .title {
            display: flex;
            align-items: center;
            .icon {
              width: 30px;
              height: 18px;
              @include bg(brand);
            }
            .txt {
              padding-left: 6px;
              font-size: 16px;
              font-weight: bold;
            }
          }
          .desc {
            margin-top: 8px;
            font-size: 12px;
          }
          .info {
            display: flex;
            align-items: center;
            margin-top: 10px;
            .txt {
              padding-left: 4px;
              line-height: 1.2;
              font-size: 10px;
            }
          }
        }
        .btn {
          position: absolute;
          right: 12px;
          bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 43px;
          height: 24px;
          font-size: 10px;
          color: #fff;
          border-radius: 50px;
          background: rgba(0, 0, 0, .2);
        }
      }
      .down {
        position: relative;
        height: 28px;
        padding: 0 38px;
        font-size: 10px;
        color: #fff;
        background: rgba(7, 17, 27, .2);
        .icon {
          position: absolute;
          left: 12px;
          top: 50%;
          width: 22px;
          height: 12px;
          margin-top: -6px;
          @include bg(bulletin);
        }
        .txt {
          line-height: 28px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .btn {
          position: absolute;
          right: 12px;
          top: 50%;
          width: 12px;
          height: 12px;
          text-align: center;
          margin-top: -6px;
        }
      }
    }
    .nav {
      display: flex;
      align-items: center;
      height: 40px;
      font-size: 14px;
      color: rgb(77, 85, 93);
      background: #fff;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
      }
      .router-link-active {
        color: rgb(240, 20, 20);
      }
    }
    .bg {
      position: absolute;
      left: 0;
      top: -120px;
      z-index: -1;
      width: 100%;
      filter: blur(10px);
    }
    .mark-wrap {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
      overflow-y: auto;
      backdrop-filter: blur(10px);
      background: rgba(7, 17, 27, .8);
      .main {
        position: relative;
        padding: 0 36px 70px;
        min-height: 100%;
        box-sizing: border-box;
        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 16px;
          padding-top: 64px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }
        .star {
          height: 24px;
          text-align: center;
          margin-top: 16px;
        }
        .info-wrap {
          margin-top: 28px;
          .info-title {
            display: flex;
            align-items: center;
            height: 14px;
            margin-bottom: 24px;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            .line {
              flex: 1;
              border-top: 1px solid rgba(255, 255, 255, .2);
            }
            .txt {
              flex: 0 0 80px;
              width: 80px;
              text-align: center;
            }
          }
          .list {
            .item {
              display: flex;
              align-items: center;
              margin-top: 12px;
              padding-left: 12px;
              &:first-child {
                margin-top: 0;
              }
              .txt {
                margin-left: 6px;
                font-size: 12px;
                color: #fff;
              }
            }
          }
          .intr {
            line-height: 2;
            padding: 0 12px;
            font-size: 12px;
            color: #fff;
          }
        }
        .btn-close {
          position: absolute;
          left: 50%;
          bottom: 40px;
          margin-left: -16px;
          font-size: 32px;
          color: rgba(255, 255, 255, .5);
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .swipe-enter-active, .swipe-leave-active {
    transform: translateX(0);
    transition: transform .3s ease-out;
  }

  .swipe-enter, .swipe-leave-to {
    transform: translateX(100%);
  }
</style>
