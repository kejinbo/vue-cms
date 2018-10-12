import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from 'vue-resource';

Vue.use(VueRouter);

//导入格式化时间的插件
import moment from "moment"
//定义全局过滤器
Vue.filter('dataFormat',function(dataStr, pattren = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattren)
})

//安装 vue-resource
Vue.use(VueResource)
//设置请求根路径
//Vue.http.options.root = "http://localhost:3000"
//全局设置 post 时候表单数据格式组织形式
//Vue.http.options.emulateJSON = true

// 导入 MUI 的样式
import "./lib/mui/css/mui.min.css";
// MUI 扩展图标样式
import "./lib/mui/css/icons-extra.css";


import { Header, Swipe, SwipeItem } from "mint-ui";
//头部区域
Vue.component(Header.name, Header);
//轮播图区域
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import router from "./router.js";

import app from "./App.vue";

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router
});
