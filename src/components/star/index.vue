<template>
  <ul class="star-wrap">
    <li :class="['item-box', 'item-box-' + size, (index < score ? 'on': '')]" v-for="(item, index) in count" :key="index"></li>
  </ul>
</template>

<script>
export default {
  name: 'Star',
  props: {
    size: {
      type: Number,
      default: 6
    },
    score: {
      type: Number,
      default: 5
    },
    count: {
      type: Number,
      default: 5
    }
  }
};
</script>

<style lang="scss" scoped>
.star-wrap {
  @include frow();
  .item-box {
    background: url(./img/star-off.png) no-repeat center;
    background-size: contain;
    &.on {
      background-image: url(./img/star-on.png);
    }
  }
  .item-box-10 {
    width: 10px;
    height: 10px;
    &:nth-of-type(n + 2) {
      margin-left: 3px;
    }
  }
  .item-box-18 {
    width: 18px;
    height: 18px;
    &:nth-of-type(n + 2) {
      margin-left: 6px;
    }
  }
  .item-box-24 {
    width: 24px;
    height: 24px;
    &:nth-of-type(n + 2) {
      margin-left: 20px;
    }
  }
}
</style>
