<template>
  <van-swipe class="my-swipe" lazy-render indicator-color="white">
    <van-swipe-item v-for="banner in bannerData" :key="banner.id">
      <img :src="banner.img_url" />
    </van-swipe-item>
  </van-swipe>
  <van-swipe class="my-swiper" @change="onChange" :show-indicators="false" :width="120" :loop="false" :initial-swipe="1">
    <van-swipe-item :class="index == initSwiper+1?'swiper-item':''" v-for="(item, index) in recommendData" :key="item.id" >
      <img :src="item.cover_url" v-if="item !== ''"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { ref } from '@vue/runtime-core'

export default {
  name: 'Swiper',
  props: {
    bannerData: {
      type: Array,
      default () {
        return []
      }
    },
    recommendData: {
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
    const initSwiper = ref(1)
    const data = ref([
      '',
      'https://p3-tt.byteimg.com/img/novel-images/fd63c85774a4365ffd3d604466199226~150x192.jpg',
      'https://p3-tt.byteimg.com/img/ff3400017755cfe40d55~150x192.jpg',
      'https://p3-tt.byteimg.com/img/novel-images/a30a9f1241ca230a50cddbc46e6a7f2a~150x192.jpg',
      'https://p3-tt.byteimg.com/img/fe5b0000e629f87b72a9~150x192.jpg',
      'https://p3-tt.byteimg.com/img/ff040001f047037caff1~150x192.jpg',
      'https://p3-tt.byteimg.com/img/novel-pic/a76bc844cc92fa446901adcbd9c8b62a~150x192.jpg',
      ''
    ])
    const onChange = (index) => {
      initSwiper.value = index
    }
    return {
      initSwiper, data, onChange
    }
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
      height: 100%;
      border-radius: 8px;
    }
  }
}
.my-swiper {
  margin-top: 4rem;
  :deep(.van-swipe__track) {
    align-items: center;
    height: 165px;
    .van-swipe-item {
      margin: 5px 0;
      padding: 0 12px;
      display: flex;
      align-items: center;
      height: 128px;
      transition: all 0.2s linear;
      img {
        width: 100%;
        height: 100%;
        box-shadow: 0px 1px 5px #bbbbbb;
      }
    }
    .swiper-item {
      width: 140px!important;
      height: 155px!important;
    }
  }
}
</style>
