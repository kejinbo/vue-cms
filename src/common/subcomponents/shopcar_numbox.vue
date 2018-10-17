<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"
export default {
    data(){
        return{

        }
    },
    mounted() {
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged(){
            //当数量值改变，立即把最新的数据提交到 localStorage
            this.$store.commit('updataGoodsInfo',{
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        }
    },
    props: ['initcount','goodsid']
};
</script>

<style lang="scss" scoped>
</style>

