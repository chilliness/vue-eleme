import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/(goods)?',
      name: 'goods',
      component: () => import('@/pages/goods')
    },
    {
      path: '/rating',
      name: 'rating',
      component: () => import('@/pages/rating')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('@/pages/seller')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
