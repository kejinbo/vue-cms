<template>
    <div class="goodsinfo-container">

        <!-- 加入购物车小球 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 图片轮播区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                <swiper :lunboList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
        <div class="mui-card-header">{{ goodsinfo.title }}</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
            <p class="price">
                市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
            </p>
            <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
            <p>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            </p>
            </div>
        </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                <p>商品货号：{{ goodsinfo.goods_no }}</p>
                <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
import numbox from "../subcomponents/goodsinfo_numbox.vue";
import swiper from "../subcomponents/swiper.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsinfo: {},
      lunbotu: [],
      ballFlag: false, //控制小球显示和隐藏
      selectedCount: 1 //保存用户选择商品的数量
    };
  },
  created() {
    this.getgoodsinfo();
    this.getlunboinfo();
  },
  methods: {
    //获取轮播图 图片信息
    getlunboinfo() {
      this.$http
        .get("http://localhost:3000/getthumimages/" + this.id)
        .then(result => {
          if (result.body.status == 0) {
            result.body.imgArr.img_Array.forEach(element => {
              element.img_url = element.src;
            });
            this.lunbotu = result.body.imgArr.img_Array;
            //console.log(result.body.imgArr.img_Array)
          }
        });
    },

    //获取商品信息
    getgoodsinfo() {
      this.$http
        .get("http://localhost:3000/getgoodsinfo/" + this.id)
        .then(result => {
          if (result.body.status == 0) {
            this.goodsinfo = result.body.data[0];
          }
        });
    },
    //添加到购物车
    addToShopCar() {
        this.ballFlag = !this.ballFlag;
    },
    beforeEnter: el => {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();

      //获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"

      done(); //动画完成后 结束该方法，进入 afterEnter方法
    },
    afterEnter(el) {
        this.ballFlag = !this.ballFlag;
    },

    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id: id } });
    },
    getSelectedCount(count) {
      this.selectedCount = count;
    }
  },
  components: {
    numbox,
    swiper
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>

