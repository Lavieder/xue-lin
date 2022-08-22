<template>
  <van-action-bar >
    <van-action-bar-icon text="购物车" @click="onGoToChildCart" :badge="isLogin?cartTotal:''">
      <template #icon>
        <i class="iconfont icon-shinshopgouwuche"></i>
      </template>
    </van-action-bar-icon>
    <van-action-bar-icon :icon="isCollect?'like':'like-o'" :color="isCollect?'#ff5050':''" text="收藏" @click="onCollectBook"/>
    <van-action-bar-button type="warning" text="加入购物车" @click="onAddCart" />
    <van-action-bar-button type="danger" text="立即购买" @click="onBuyNow" />
  </van-action-bar>
</template>

<script>
import router from '@/router'
import { Toast } from 'vant'
export default {
  props: {
    cartTotal: {
      type: Number,
      default: 0
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    isCollect: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const { emit } = context
    // 从详情页去购物车
    const onGoToChildCart = () => {
      emit('onGoToChildCart')
    }
    // 收藏图书商品
    const onCollectBook = () => {
      emit('onCollectBook')
    }
    // 加入购物车
    const onAddCart = () => {
      if (props.isLogin) {
        emit('onAddCart')
      } else {
        Toast.fail({
          message: '您还没有登录哦！',
          duration: 1000
        })
        setTimeout(() => {
          router.push({
            path: '/login'
          })
        }, 1000)
      }
    }
    // 立即购买
    const onBuyNow = () => {
      emit('onBuyNow')
    }
    return {
      onGoToChildCart,
      onCollectBook,
      onAddCart,
      onBuyNow
    }
  }

}
</script>

<style lang="scss" scoped>
.van-action-bar::v-deep {
  width: 375px;
  height: 55px;
  padding: 0 12px;
  box-sizing: border-box;
  border-top: 1px solid rgb(223 223 223);
  .van-action-bar-icon {
    min-width: 60px;
    color: $color-text;
    font-size: 11px;
    .van-action-bar-icon__icon,
    .iconfont {
      font-size: 24px;
    }
    .van-badge {
      background: $color-dot;
      top: 5px;
    }
  }
  .van-action-bar-icon:active {
    background: none;
  }
  .van-action-bar-button--first {
    border-radius: 7px 0 0 7px;
    margin-left: 10px;
    background: $color-sub-theme;
  }
  .van-action-bar-button--last {
    border-radius: 0 7px 7px 0;
    // margin-right: 10px;
    background: $color-theme;
  }
}
</style>
