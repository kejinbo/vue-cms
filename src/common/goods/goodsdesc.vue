<template>
    <div class="goodsdesc-container">
    <h3>{{ info.title }} --{{info.id}}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            info:{} //图文数据
        }
    },created() {
        this.getgoodsdesc();
    },
    methods:{
        getgoodsdesc(){
            this.$http.get("http://localhost:3000/getdesc/" + this.$route.params.id).then(result => {
                if(result.body.status == 0){
                    this.info = result.body.data[0];
                }
            })
        }
    }
}
</script>

<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    img{
      width: 100%;
    }
  }
}
</style>
