import Vue from 'vue';
import axios from 'axios';
import BScroll from 'better-scroll';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './utils/api';
import { Btn, Star, Icon, Divide, Toggle, Toast } from './components';
import './common/scss/index.scss';

// 导入mock数据，npm run build前，请手动注释，否则将使用mock数据
import './utils/mock';

Vue.config.productionTip = false;
Vue.use(Btn);
Vue.use(Star);
Vue.use(Icon);
Vue.use(Divide);
Vue.use(Toggle);
Vue.use(Toast);
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
