## 实现 新闻资讯列表 点击跳转到新闻详情

1. 把列表中的每一项改造成 router-link ,同时，在跳转的时候应该提供唯一的 ID 标识符
2. 创建新闻详情的组件页面 newsInofo.vue
3. 在路由模块中，将新闻详情的路由地址 和组件页面对应起来

## 单独封装一个 comment.vue 评论子组件

1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment.vue +`import comment from './comment.vue'`
3. 在父组件中，使用`components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的注册名称，以 标签形式，在页面中引用即可

## 实现首页的图片分享功能 
1. 创建 模块 photolist.vue ###制作顶部滑动条 1.使用 mui 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是 JS 组件，需要被初始化一下：
+ 导入 mui.js
+ 调用官方提供的 方式 去初始化：
```
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```
4. 导入mui.js后滑动条依旧不能滑动，这是报错 `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
+ 这是因为 webpack 打包好的 bundle.js 中 默认是严格模式 我们使用插件babel-plugin-transform-remove-strict-mode 取消严格模式
5. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；
6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字

 ## 制作图片列表区域
 1.使用Mint-UI 提供的现成的 组件 `lazy-load` 实现图片懒加载

 ## 使用vue-preview 实现查看缩略图
 1. 安装vue-preview
 ```
 import VuePreview from 'vue-preview'
  //defalut install
 Vue.use(VuePreview)
 ```
 2. 使用方式：`<vue-preview :slides="slide1" @close="handleClose"></vue-preview>`
