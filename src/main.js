// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'
import mydata from './components/mydata/mydata.vue'

import './common/stylus/index.styl'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
//定义路由
var routes=[
  {path:'/',redirect:'/goods'},
  {path:'/goods',component:goods},
  {path:'/ratings',component:ratings},
  {path:'/seller',component:seller},
  {path:'/mydata',component:mydata}
];

//创建router实例，然后传入routes配置
var router=new VueRouter({
  linkActiveClass:'active',
  routes
});
//创建挂载点
new Vue({
  el:'#app',
  router,
  render:h=>h(App)
})
