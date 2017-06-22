<template>
  <i class="icon-wrap" :class="[icon[types], cls + sizes]"></i>
</template>

<script>
  export default {
    props: {
      sizes: {
        type: Number,
        default: 24
      },
      types: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        icon: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        cls: 'size-'
      };
    }
  };
</script>

<style scoped lang="scss">
  @import '../../common/scss/mixin';

  .icon-wrap {
    display: inline-block;
    box-shadow: 0 0 1px #ccc;
    &.size-24 {
      width: 12px;
      height: 12px;
    }
    &.size-32 {
      width: 16px;
      height: 16px;
    }
    &.decrease {
      @include bg(decrease);
    }
    &.discount {
      @include bg(discount);
    }
    &.special {
      @include bg(special);
    }
    &.invoice {
      @include bg(invoice);
    }
    &.guarantee {
      @include bg(guarantee);
    }
  }
</style>
