import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/pages/goods';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
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
      redirect: '/goods'
    }
  ]
});
