<template>
  <span :class="['icon-wrap', handleType(), (size ? 'small' : '')]"></span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: Number,
      default: 0
    },
    size: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _type() {
      let str = 'decrease';
      switch (this.type) {
        case 0:
          str = 'decrease';
          break;

        case 1:
          str = 'discount';
          break;

        case 2:
          str = 'special';
          break;

        case 3:
          str = 'invoice';
          break;

        case 4:
          str = 'guarantee';
          break;
      }

      return `icon-${str}`;
    }
  },
  methods: {
    handleType() {
      let str = 'decrease';
      switch (this.type) {
        case 0:
          str = 'decrease';
          break;

        case 1:
          str = 'discount';
          break;

        case 2:
          str = 'special';
          break;

        case 3:
          str = 'invoice';
          break;

        case 4:
          str = 'guarantee';
          break;
      }

      return `icon-${str}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-wrap {
  display: inline-flex;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  background: no-repeat center;
  background-size: contain;
  &.small {
    width: 12px;
    height: 12px;
    margin-right: 2px;
  }
  &.icon-decrease {
    background-image: url(./img/decrease.png);
  }
  &.icon-discount {
    background-image: url(./img/discount.png);
  }
  &.icon-special {
    background-image: url(./img/special.png);
  }
  &.icon-invoice {
    background-image: url(./img/invoice.png);
  }
  &.icon-guarantee {
    background-image: url(./img/guarantee.png);
  }
}
</style>
