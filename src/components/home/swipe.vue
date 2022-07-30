<template>
  <van-swipe class="my-swipe" lazy-render indicator-color="white">
    <van-swipe-item v-for="banner in bannerData" :key="banner.id">
      <img :src="banner.img_url">
    </van-swipe-item>
  </van-swipe>

</template>

<script>
import { Swipe, SwipeItem } from 'vant'

export default {
  name: 'Swipe',
  props: {
    bannerData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  margin-top: 0.3rem;
  .van-swipe-item {
    padding: 0 12px;
    display: flex;
    align-items: center;
    height: 151px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: fill;
    }
  }
}
</style>
