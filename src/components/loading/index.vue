<template>
  <div class="loading-wrap"></div>
</template>

<script>
export default {
  name: 'Loading'
};
</script>

<style lang="scss" scoped>
.loading-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: $bg181 url(./img/bg.gif) no-repeat center;
}
</style>
