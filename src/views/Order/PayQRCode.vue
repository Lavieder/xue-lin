<template>
  <div class="pay-qrcode">
    <van-nav-bar fixed :border="false" title="支付二维码" placeholder>
      <template #left>
        <i class="iconfont icon-left" @click.stop="onClickBack"></i>
      </template>
    </van-nav-bar>
    <div class="code-main">
      <p>支付宝支付二维码</p>
      <img :src="codeUrl" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const route = useRoute()
    const codeUrl = computed(() => {
      return route.query.code_url
    })
    return {
      codeUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-qrcode {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #ffffff;
  .code-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 365px;
  }
}

</style>
