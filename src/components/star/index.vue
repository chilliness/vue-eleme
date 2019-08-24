<template>
  <ul class="star-wrap">
    <li :class="['star-item', 'star-item-' + size, (index < score ? 'on': '')]" v-for="(item, index) in handleCount()" :key="index"></li>
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
  },
  methods: {
    handleCount() {
      return [...''.padEnd(this.count)];
    }
  }
};
</script>

<style lang="scss" scoped>
.star-wrap {
  @include frow();
  .star-item {
    background: url(./img/star-off.png) no-repeat center;
    background-size: contain;
    &.on {
      background-image: url(./img/star-on.png);
    }
  }
  .star-item-10 {
    width: 10px;
    height: 10px;
    &:nth-of-type(n + 2) {
      margin-left: 3px;
    }
  }
  .star-item-18 {
    width: 18px;
    height: 18px;
    &:nth-of-type(n + 2) {
      margin-left: 6px;
    }
  }
  .star-item-24 {
    width: 24px;
    height: 24px;
    &:nth-of-type(n + 2) {
      margin-left: 20px;
    }
  }
}
</style>
