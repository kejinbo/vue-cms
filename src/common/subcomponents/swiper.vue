<template>
    <div>
        <mt-swipe class="h-Swiper" :auto="4000">
          <mt-swipe-item v-for="item in lunboList" :key="item.id">
            <img :src="item.img_url" alt="" :class="{'full':isfull}">
          </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["lunboList", "isfull"]
}
</script>

<style lang="scss" scoped>
.h-Swiper {
  height: 200px;

  .mint-swipe-item {
      text-align: center;

    img {
      height: 100%;
    }
  }
}
.full{
    width: 100%
}
</style>

