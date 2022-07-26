<template>
  <van-swipe class="my-swipe" lazy-render indicator-color="white">
    <van-swipe-item v-for="banner in bannerData" :key="banner.id">
      <img :src="banner.img_url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { toRef } from 'vue'

export default {
  name: 'Swiper',
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
  },
  setup (props, context) {
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
    img {
      width: 100%;
      height: 10.5rem;
      border-radius: 8px;
    }
  }
}
</style>
