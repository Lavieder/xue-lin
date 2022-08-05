<template>
  <div class="book-detail">
    <van-nav-bar fixed :border="false" >
     <template #left>
        <i class="iconfont icon-left" @click.stop="onClickBack"></i>
      </template>
     <template #right>
        <i class="iconfont icon-share" @click.stop="onClickShare"></i>
        <i class="iconfont icon-gengduo" @click.stop="onClickMore"></i>
      </template>
    </van-nav-bar>
    <div class="detail-content">
      book-detail
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, onActivated } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// import { offsetTop, getNode, getNavHeight } from 'mixins/navHeight'
export default {
  setup () {
    // const navNode = getCurrentInstance()
    // getNode(navNode)
    const store = useStore()
    const route = useRoute()
    const setCurrentPath = () => {
      store.commit('SET_CURRENT_PATH', route.name)
    }
    const onClickBack = () => history.back()
    const onClickShare = () => {
      console.log('分享')
    }
    const onClickMore = () => {
      console.log('更多')
    }
    onBeforeMount(() => {
      setCurrentPath()
    })
    // 只有activated 生命周期在组件使用keep-alive缓存后也能执行相应操作
    onActivated(() => {
      setCurrentPath()
    })
    onMounted(() => {
      // getNavHeight()
    })
    return {
      onClickBack,
      onClickShare,
      onClickMore
    }
  }
}
</script>

<style lang="scss" scoped>

.book-detail::v-deep {
  .van-nav-bar {
    padding: 0 12px;
    background: transparent;
    .van-nav-bar__content {
      .van-nav-bar__left,
      .van-nav-bar__right {
        padding: 0;
      }
      .van-haptics-feedback:active {
        opacity: initial;
      }
    }
    i.iconfont {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      font-size: 19px;
      color: #ffffff;
    }
    .icon-share {
      margin-right: 15px;
    }
  }
  .detail-content {
    height: 1000px;
  }
}
</style>
