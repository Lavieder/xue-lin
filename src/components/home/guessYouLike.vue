<template>
  <swiper
    :slides-per-view="3"
    :centered-slides="true"
    :initial-slide="1"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(item,index) in recommendData" :key="index">
      <img :src="item.cover_url" :alt="item.title"/>
    </swiper-slide>
  </swiper>
  <div class="book-text-wrap">
  <template v-for="(item, index) in recommendData" :key="index">
    <transition name="fade">
        <div class="book-text" v-if="index == initialSlide">
          <div class="name-price">
            <span class="name">{{item.title}}</span>
            <span class="price">￥{{item.price}}</span>
          </div>
          <div class="book-info">
            <span>{{item.description}}</span>
          </div>
        </div>
    </transition>
  </template>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import 'swiper/scss'

export default {
  props: {
    recommendData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup (props, context) {
    const initialSlide = ref(1)
    const onSwiper = (swiper) => {
      initialSlide.value = swiper.activeIndex
    }
    const onSlideChange = (swiper) => {
      initialSlide.value = swiper.activeIndex
    }
    return {
      initialSlide,
      onSwiper,
      onSlideChange
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s linear;
}

.swiper {
  width: 100%;
  height: 100%;
  .swiper-wrapper {
    align-items: center;
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      height: 160px;
      margin: 12px 0;
      box-shadow: 0 -1px 7px #c4c4c4;
      transition: 300ms;
      transform: scale(0.8);
      img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
  }
}
.book-text-wrap{
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .book-text {
    text-align: center;
    width: 80%;
    // height: 100%;
    .name-price {
      margin: 0px 0 10px;
      .name {
        font-size: $font-size-medium;
        font-weight: 600;
      }
      .price {
        font-size: $font-size-small;
        color: $color-theme;
      }
    }
    .book-info {
      font-size: $font-size-small;
      color: #969696;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      letter-spacing: 1px;
      line-height: 16px;
    }
  }
}
</style>
