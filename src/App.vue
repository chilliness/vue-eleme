<template>
  <div id="app">
    <headers></headers>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <carts></carts>
  </div>
</template>

<script>
  import headers from './components/headers/headers';
  import carts from './components/carts/carts';

  export default {
    components: {
      headers,
      carts
    }
  };
</script>

<style>
</style>
