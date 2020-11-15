import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

// 导入VantUI的所有组件
import VantUI from 'vant';
// 导入VantUI的样式文件
import 'vant/lib/index.css';
//通过Vue.use()方法将vant注册为Vue的插件
Vue.use(VantUI);

// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://127.0.0.1:8888';
Vue.prototype.axios = axios;

Vue.prototype.qs = qs;
Vue.prototype.moment = moment;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
