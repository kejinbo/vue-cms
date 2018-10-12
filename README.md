## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造成 router-link ,同时，在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面 newsInofo.vue
3. 在路由模块中，将新闻详情的路由地址 和组件页面对应起来

##单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入comment.vue
    +`import comment from './comment.vue'`
3. 在父组件中，使用`components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的注册名称，以 标签形式，在页面中引用即可
