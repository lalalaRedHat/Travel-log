import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment';
import { Lazyload } from 'vant';

// 导入VantUI的所有组件
import VantUI from 'vant';
// 导入VantUI的样式文件
import 'vant/lib/index.css';
//通过Vue.use()方法将vant注册为Vue的插件
Vue.use(VantUI);

// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://127.0.0.1:8888';
Vue.prototype.axios = axios;
Vue.prototype.moment = moment;
moment.locale("zh-cn");
Vue.prototype.qs = qs;

// 定义一个全局过滤器实现日期格式化
Vue.filter('datefmt', function (input, fmtstring) {
  return moment.unix(input).format(fmtstring)
})

// 全局注册懒加载
Vue.use(Lazyload, {
  lazyComponent: true
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
