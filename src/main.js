import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";

Vue.use(VueRouter);

//注册vuex
import Vuex from "vuex";
Vue.use(Vuex);

var car = JSON.parse(localStorage.getItem("car") || "[]");
var store = new Vuex.Store({
  state: {
    //调用 this.$store.state.***
    car: car
  },
  mutations: {
    //调用 this.$store.commit('方法名'，'按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      //假设 在购物车中。没有找到对用的商品
      var flag = false;
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      });
      if (!flag) {
        state.car.push(goodsinfo);
      }

      //当更新 car 后, 把car数组，存储到本地的 localStorage 中
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    updataGoodsInfo(state, goodsinfo) {
      //修改购物车中商品的数量
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    updateGoodsSelected(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.selected = goodsinfo.selected;
          return true;
        }
      });
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    removeGoods(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      });
      localStorage.setItem("car", JSON.stringify(state.car));
    }
  },
  getters: {
    //调用 this.$store.getters.***
    //相当于 计算属性 或 filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
        console.log(item.id);
      });
      return o;
    },
    getGoodsSelected(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0,
        amount: 0
      };
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.amount += item.count * item.price;
        }
      });
      return o;
    }
  }
});

//导入格式化时间的插件
import moment from "moment";
//定义全局过滤器
Vue.filter("dataFormat", function(dataStr, pattren = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattren);
});

//安装 vue-resource
Vue.use(VueResource);
//设置请求根路径
//Vue.http.options.root = "http://localhost:3000"
//全局设置 post 时候表单数据格式组织形式
//Vue.http.options.emulateJSON = true

// 导入 MUI 的样式
import "./lib/mui/css/mui.min.css";
// MUI 扩展图标样式
import "./lib/mui/css/icons-extra.css";

//安装 图片预览插件
import VuePreview from "vue-preview";
Vue.use(VuePreview);

//安装 mint-ui
import mint from "mint-ui";
Vue.use(mint);

import router from "./router.js";

import app from "./App.vue";

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router,
  store //挂载 store 状态管理对象
});
