import VueRouter from "vue-router";

//底部导航栏组件
import home from "./common/tarbars/home.vue";
import cart from "./common/tarbars/cart.vue";
import member from "./common/tarbars/member.vue";
import search from "./common/tarbars/search.vue";

//新闻组件
import newlist from "./common/news/newslist.vue";
import newsInfo from "./common/news/newsInfo.vue";

//图片分享模块
import photoList from "./common/photos/photoList.vue";
import photoInfo from "./common/photos/photoInfo.vue"

//商品购买区域
import goodslist from "./common/goods/goodList.vue";
import goodsinfo from "./common/goods/goodsinfo.vue";
import goodsdesc from "./common/goods/goodsdesc.vue";

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: home },
    { path: "/cart", component: cart },
    { path: "/member", component: member },
    { path: "/search", component: search },
    { path: "/home/newslist", component: newlist },
    { path: "/home/newsInfo/:id", component: newsInfo },
    { path: "/home/photolist", component: photoList },
    { path: "/home/photoInfo/:id", component: photoInfo },
    { path: "/home/goodslist/", component: goodslist },
    { path: "/home/goodsinfo/:id", component: goodsinfo,name:"goodsinfo" },
    { path: "/home/goodsdesc/:id", component: goodsdesc,name:"goodsdesc" }
  ],
  linkActiveClass: "mui-active"
});

// 把路由对象暴露出去
export default router;
