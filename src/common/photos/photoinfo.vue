<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
        <span>发表时间：{{photoinfo.add_time | dataFormat}}</span>
        <span>点击：{{photoinfo.click}}次</span>
        </p>

        <hr>

        <!-- 缩略图 -->
        <div class="thumbs">
            <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->
            <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getphotoinfo();
    this.getThumbs();
  },
  methods: {
    //获取缩略图
    getThumbs() {
      this.$http
        .get("http://localhost:3000/getthumimages/" + this.id)
        .then(result => {
          if (result.body.status == 0) {
            result.body.imgArr.img_Array.forEach(element => {
              element.w = 600;
              element.h = 400;
              element.msrc = element.src;
            });
            this.list = result.body.imgArr.img_Array;
          }
        });
    },
    //获取图片详情信息
    getphotoinfo() {
      this.$http
        .get("http://localhost:3000/gettiamgeinfo/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.photoinfo = result.body.data[0];
            //console.log(result.body.data[0])
          }
        });
    },
    handleClose() {
      console.log("aa");
    }
  }
};
</script>

<style lang="scss">
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    display: flex;
    div {
      width: 100%;
    }
    .my-gallery {
      display: flex;
      flex-wrap: wrap;

      figure {
        margin: 10px;
        box-shadow: 0 0 8px #999;

        img {
          width: 100px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

