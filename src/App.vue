<template>
  <div id="app">
    <Nav :seller="seller"></Nav>
    <keep-alive :include="['Goods']">
      <router-view :seller="seller" :ratings="ratings" :goods="goods"></router-view>
    </keep-alive>
    <Cart></Cart>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import Nav from '@/components/nav';
import Cart from '@/components/cart';
import Loading from '@/components/loading';

export default {
  name: 'App',
  components: { Nav, Cart, Loading },
  data() {
    return {
      seller: {},
      ratings: [],
      goods: [],
      isAjax: false,
      isLoading: true
    };
  },
  mounted() {
    this.handleFetchData();
  },
  methods: {
    async handleFetchData() {
      if (this.isAjax) {
        return;
      }

      try {
        this.isAjax = true;
        let res = await this.$http({ url: this.$api.list });
        this.isAjax = false;

        if (res.code === 200) {
          this.isLoading = false;
          this.seller = res.data.seller;
          this.ratings = res.data.ratings;
          this.goods = res.data.goods;
        } else {
          this.$toast({ msg: this.$api.msg });
        }
      } catch (e) {
        this.isAjax = false;
        this.$toast({ msg: this.$api.msg });
      }
    }
  }
};
</script>

<style lang="scss"></style>
