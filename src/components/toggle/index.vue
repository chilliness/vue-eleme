<template>
  <div class="toggle-wrap">
    <h3 class="caption">商品评价</h3>
    <ul class="btn-list">
      <li class="item-box" :class="{active: item.type === data.nowType}" v-for="(item, index) in data.list" :key="index" @click="handleToggle(data.isHasContent, item.type)">
        <span class="text">{{item.text}}</span>
        <span>{{item.num}}</span>
      </li>
    </ul>
    <div class="choose-outer">
      <div class="choose-box" @click="handleToggle(!data.isHasContent, data.nowType)">
        <i class="iconfont icon-checked" :class="{active: data.isHasContent}"></i>
        <span>只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: {
    data: {
      type: Object,
      default() {
        return {
          nowType: -1,
          isHasContent: false,
          list: [
            { text: '全部', type: -1, num: 0 },
            { text: '满意', type: 1, num: 0 },
            { text: '不满意', type: 0, num: 0 }
          ]
        };
      }
    }
  },
  methods: {
    handleToggle(bool, num) {
      this.$emit('toggle', { isHasContent: bool, nowType: num });
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle-wrap {
  padding: 0 18px;
  font-size: 12px;
  .caption {
    padding-top: 18px;
    font-size: 14px;
    font-weight: bold;
  }
  .btn-list {
    @include frow(flex-start);
    height: 67px;
    .item-box {
      @include frow();
      height: 32px;
      padding: 0 12px;
      border-radius: 3px;
      background: $bgf3f;
      &:nth-of-type(n + 2) {
        margin-left: 8px;
      }
      &.active {
        color: $fswhite;
        background: $bg00a;
      }
      .text {
        margin-right: 4px;
        font-size: 14px;
      }
    }
  }
  .choose-outer {
    @include frow(flex-start);
    height: 48px;
    border-top: 1px solid $bdeee;
    .choose-box {
      @include frow(flex-start);
      display: inline-flex;
      color: $fs9aa;
    }
    .iconfont {
      font-size: 24px;
      margin-right: 6px;
      &.active {
        color: $fs00a;
      }
    }
  }
}
</style>
