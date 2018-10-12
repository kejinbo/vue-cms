import VueRouter from "vue-router";

//底部导航栏组件
import home from "./common/tarbars/home.vue";
import cart from "./common/tarbars/cart.vue";
import member from "./common/tarbars/member.vue";
import search from "./common/tarbars/search.vue";

//新闻组件
import newlist from "./common/news/newslist.vue";
import newsInfo from "./common/news/newsInfo.vue";
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: home },
    { path: "/cart", component: cart },
    { path: "/member", component: member },
    { path: "/search", component: search },
    { path: "/home/newslist", component: newlist },
    { path: "/home/newsInfo/:id", component: newsInfo }
  ],
  linkActiveClass: "mui-active"
});

// 把路由对象暴露出去
export default router;
