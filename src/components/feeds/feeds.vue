<template>
  <div class="feeds-wrap">
    <div class="btn-wrap bd">
      <span class="item" :class="[cls[index], { on: curNum == index }]" v-for="(item, index) in txts"
            @click="change(index, $event)">
        <span class="txt">{{ item.title }}</span>
        <span class="num">{{ item.num }}</span>
      </span>
    </div>
    <div class="only-have">
      <i class="icon icon-checked" :class="{ on: onlyHave }" @click="change"></i>
      <span class="txt">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      txts: {
        type: Array,
        default() {
          return [
            {title: '全部', num: 0},
            {title: '满意', num: 0},
            {title: '不满意', num: 0}
          ];
        }
      }
    },
    data() {
      return {
        cls: ['all', 'good', 'bad'],
        curNum: 0,
        onlyHave: false
      };
    },
    methods: {
      change(index, ev) {
        if (ev) {
          this.curNum = index;
        } else {
          this.onlyHave = !this.onlyHave;
        }
        this.$emit('onlyHave', this.curNum, this.onlyHave);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/scss/mixin";

  .feeds-wrap {
    padding: 0 18px;
    .btn-wrap {
      display: flex;
      align-items: center;
      padding: 12px 0 18px;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        height: 32px;
        margin-left: 8px;
        border-radius: 1px;
        &.all {
          margin-left: 0;
          background: rgba(0, 160, 220, .4);
          &.on {
            color: #fff;
            background: rgb(0, 160, 220);
          }
        }
        &.good {
          background: rgba(0, 160, 220, .2);
          &.on {
            color: #fff;
            background: rgb(0, 160, 220);
          }
        }
        &.bad {
          background: rgba(77, 85, 93, .2);
          &.on {
            color: #fff;
            background: rgb(77, 85, 93);
          }
        }
        .txt {
          font-size: 12px;
        }
        .num {
          margin-left: 4px;
          font-size: 8px;
        }
      }
    }
    .only-have {
      display: flex;
      align-items: center;
      height: 48px;
      color: rgb(147, 153, 159);
      .icon {
        font-size: 24px;
        &.on {
          color: rgb(0, 160, 220);
        }
      }
      .txt {
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }
</style>
