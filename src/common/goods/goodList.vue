<template>
    <div class="goods-list">
        <!-- 使用编程式导航 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.ima_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.strock_quantity}}件</span>
                </div>
            </div>
        </div>
        

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 0, //分页的页数
      goodslist: [] //存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getMore() {
      //获取第二页的信息
      this.pageindex++;
      this.getGoodsList();
    },
    getGoodsList() {
      this.$http
        .get("http://localhost:3000/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          //console.log(result)
          if (result.body.status == 0) {
            //将原来的数组跟返回的数组进行拼接，返回新的数组，实现加载更多
            this.goodslist = this.goodslist.concat(result.body.data);
          }
        });
    },
    goDetail(id) {
      //传递命名的路由
      this.$router.push({ name: "goodsinfo", params: { id: id } });
    }
  }
};
</script>

<style lang="scss">
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>

