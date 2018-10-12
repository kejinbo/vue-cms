<template>
    <div>
        <!-- 使用 mui-ui 绘制新闻列表 -->
        <ul class="mui-table-view">
          <!-- 实现 新闻资讯列表 点击跳转到新闻详情 -->
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>时间：{{item.add_time | dataFormat}}</span>
                            <span>浏览次数: {{item.click}} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
			</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewslist();
  },
  methods: {
    getNewslist() {
      this.$http.get("http://localhost:3000/getnewslist").then(data => {
        if (data.body.status === 0) {
          this.newslist = data.body.message;
        } else {
          Toast("加载失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view li h1 {
  font-size: 16px;
}
.mui-table-view {
  .mui-ellipsis {
    font-size: 12px;
    color: #266aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
