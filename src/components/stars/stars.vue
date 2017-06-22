<template>
  <div class="stars-wrap">
    <i class="icon" :class="[cls + sizes, icon[index]]" v-for="(item, index) in nums"></i>
  </div>
</template>

<script>
  export default {
    props: {
      sizes: {
        type: Number,
        default: 24
      },
      scores: {
        type: Number,
        default: 5
      },
      nums: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        cls: 'size-',
        icon: []
      };
    },
    mounted() {
      this.calcScores();
    },
    methods: {
      calcScores() {
        // 需要显示多少颗星
        if (this.scores >= this.nums) {
          this.nums = Math.ceil(this.scores);
        }
        // 有多少颗完整的星
        for (let i = 0; i < Math.floor(this.scores); i++) {
          this.icon.push('on');
        }
        // 是否有半星
        if (this.scores < Math.round(this.scores)) {
          this.icon.push('half');
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/scss/mixin";

  .stars-wrap {
    font-size: 0;
    .icon {
      display: inline-block;
      &.size-24 {
        width: 12px;
        height: 12px;
        margin-left: 3px;
        @include bg(star24_off);
        &:first-child {
          margin-left: 0;
        }
        &.on {
          @include bg(star24_on);
        }
        &.half {
          @include bg(star24_half);
        }
      }
      &.size-36 {
        width: 18px;
        height: 18px;
        margin-left: 6px;
        @include bg(star36_off);
        &:first-child {
          margin-left: 0;
        }
        &.on {
          @include bg(star36_on);
        }
        &.half {
          @include bg(star36_half);
        }
      }
      &.size-48 {
        width: 24px;
        height: 24px;
        margin-left: 20px;
        @include bg(star48_off);
        &:first-child {
          margin-left: 0;
        }
        &.on {
          @include bg(star48_on);
        }
        &.half {
          @include bg(star48_half);
        }
      }
    }
  }
</style>
