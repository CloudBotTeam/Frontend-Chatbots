import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js' 
import './ui.js' 
import axios from 'axios'

//axios不能再其他组件中使用，所以将axios改写为vue的原型属性
Vue.prototype.$http = axios;//组件进行数据请求时可用this.$http.get().then()来实现

Vue.config.productionTip = false;
var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


