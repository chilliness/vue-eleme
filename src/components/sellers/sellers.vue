<template>
  <div class="sellers-wrap" ref="scroll_hook">
    <div>
      <header class="head">
        <div class="top bd">
          <div class="title">{{ seller.name }}</div>
          <div class="num-wrap">
            <stars :sizes="36" :scores="seller.score" v-if="seller.score"></stars>
            <span class="ratings">({{ seller.ratingCount }})</span>
            <span class="sell">月售{{ seller.sellCount }}单</span>
          </div>
          <div class="btn" @click="toggleLike" v-if="like">
            <i class="icon icon-favorite"></i>
            <p class="txt">未收藏</p>
          </div>
          <div class="btn on" @click="toggleLike" v-else>
            <i class="icon icon-favorite"></i>
            <p class="txt">已收藏</p>
          </div>
        </div>
        <div class="bot">
          <div class="item">
            <h4 class="title">起送价</h4>
            <div class="num">
              <b class="big">{{ seller.minPrice }}</b>
              <span class="sign">元</span>
            </div>
          </div>
          <div class="item">
            <h4 class="title">商家配送</h4>
            <div class="num">
              <b class="big">{{ seller.deliveryPrice }}</b>
              <span class="sign">元</span>
            </div>
          </div>
          <div class="item">
            <h4 class="title">平均配送时间</h4>
            <div class="num">
              <b class="big">{{ seller.deliveryTime }}</b>
              <span class="sign">分钟</span>
            </div>
          </div>
        </div>
      </header>
      <splits></splits>
      <div class="info-wrap">
        <h3 class="title">公告与活动</h3>
        <p class="intr">{{ seller.bulletin }}</p>
        <ul class="list list-16">
          <li class="item" v-for="item in seller.supports">
            <icons :sizes="32" :types="item.type"></icons>
            <span class="txt">{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <splits></splits>
      <div class="info-wrap">
        <h3 class="title">商家实景</h3>
        <div class="pic-wrap" ref="pic_hook">
          <ul class="pic-list">
            <li class="pic" v-for="item in seller.pics">
              <img class="img" :src="item" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <splits></splits>
      <div class="info-wrap">
        <h3 class="title">商家信息</h3>
        <ul class="list list-12">
          <li class="item" v-for="item in seller.infos">
            <span class="txt">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import stars from '../../components/stars/stars.vue';
  import icons from '../../components/icons/icons.vue';
  import splits from '../../components/splits/splits.vue';
  import {getStyle} from '../../common/js/util';
  import BScroll from 'better-scroll';
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        seller: []
      };
    },
    computed: mapState(['like']),
    mounted() {
      this.initData();
    },
    methods: {
      ...mapActions(['toggleLike']),
      initData() {
        this.$http.get('api/seller')
          .then((res) => {
            res = res.data;
            if (res.errno === 0) {
              this.seller = res.data;
              this.initScroll();
              this.initScrollHor();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      initScroll() {
        this.$nextTick(() => {
          // 初始化左菜单滚动
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.scroll_hook, {
              click: true,
              probeType: 3
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      initScrollHor() {
        this.$nextTick(() => {
          // 设置ul(商家实景)的宽度
          let width = parseInt(getStyle(this.$refs.pic_hook.children[0].children[0], 'width'));
          this.$refs.pic_hook.children[0].style.width = (width + 6) * this.seller.pics.length - 6 + 'px';
          // 初始化左菜单滚动
          if (!this.scrollHor) {
            this.scrollHor = new BScroll(this.$refs.pic_hook, {
              click: true,
              scrollX: true,
              probeType: 3
            });
          } else {
            this.scrollHor.refresh();
          }
        });
      }
    },
    components: {
      stars,
      icons,
      splits
    }
  };
</script>

<style scoped lang="scss">
  .sellers-wrap {
    position: absolute;
    left: 0;
    top: 175px;
    right: 0;
    bottom: 48px;
    overflow: hidden;
    .head {
      height: 150px;
      padding: 0 18px;
      .top {
        position: relative;
        padding: 18px 0;
        .title {
          font-size: 14px;
          font-weight: bold;
          color: rgb(7, 17, 27);
        }
        .num-wrap {
          display: flex;
          align-items: center;
          height: 18px;
          margin-top: 8px;
          font-size: 10px;
          color: rgb(77, 85, 93);
          .ratings {
            margin-left: 8px;
          }
          .sell {
            margin-left: 12px;
          }
        }
        .btn {
          position: absolute;
          right: 0;
          bottom: 18px;
          width: 40px;
          text-align: center;
          color: rgb(77, 85, 93);
          &.on {
            .icon {
              color: rgb(240, 20, 20);
            }
          }
          .icon {
            font-size: 24px;
          }
          .txt {
            margin-top: 4px;
            font-size: 10px;
          }
        }
      }
      .bot {
        display: flex;
        align-items: center;
        padding: 18px 0;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          border-left: 1px solid rgba(7, 17, 27, .1);
          &:first-child {
            border-left: 0 none;
          }
          .title {
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .num {
            margin-top: 8px;
            font-size: 0;
            .big {
              font-size: 24px;
            }
            .sign {
              font-size: 10px;
            }
          }
        }
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
        line-height: 1.2;
        text-align: justify;
        margin-top: 8px;
        padding: 0 12px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
      .list {
        &.list-16 {
          margin-top: 16px;
        }
        &.list-12 {
          margin-top: 12px;
        }
        .item {
          display: flex;
          align-items: center;
          padding: 16px 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          border-top: 1px solid rgba(7, 17, 27, .1);
          .txt {
            line-height: 1.3;
            margin-left: 6px;
          }
        }
      }
      .pic-wrap {
        height: 90px;
        margin-right: -18px;
        padding: 12px 0 18px;
        overflow: hidden;
        .pic-list {
          display: flex;
          flex-wrap: nowrap;
          .pic {
            width: 120px;
            height: 90px;
            &:not(:last-child) {
              margin-right: 6px;
            }
          }
        }
      }
    }
  }
</style>
