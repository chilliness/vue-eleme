import Vue from 'vue';
import axios from 'axios';
import BScroll from 'better-scroll';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './utils/api';
import Btn from './components/btn';
import Star from './components/star';
import Icon from './components/icon';
import Divide from './components/divide';
import Toggle from './components/toggle';
import GlobalToast from './components/toast';
import './common/scss/index.scss';

Vue.config.productionTip = false;
Vue.use(Btn);
Vue.use(Star);
Vue.use(Icon);
Vue.use(Divide);
Vue.use(Toggle);
Vue.use(GlobalToast);
// axios响应拦截器
axios.interceptors.response.use(res => res.data);
Vue.prototype.$http = axios;
Vue.prototype.$BScroll = BScroll;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
