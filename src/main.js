import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js' 
import './ui.js' 
import axios from 'axios'
//import qs from 'qs' // 引入qs
import global from './components/Address'

//全局请求ip
Vue.prototype.global = global

//axios不能在其他组件中使用，所以将axios改写为vue的原型属性
Vue.prototype.$http = axios;//组件进行数据请求时可用this.$http.get().then()来实现

/*
//添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if(config.method === 'post') { // post请求时，处理数据
      config.data = qs.stringify( {
          ...config.data //后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
      })
  } 
  return config;
}, function (error) {
  loadinginstace.close()
  return Promise.reject(error);
})

//添加响应拦截器
axios.interceptors.response.use(function(response){
  return response;
},function(error){
 return Promise.reject(error);
});
*/


Vue.config.productionTip = false;
var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


