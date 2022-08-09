<template>
  <div class="setting">
    <van-nav-bar fixed :border="false" title="账号设置" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
    </van-nav-bar>
    <div class="set-main">
      <van-form @submit="onLogoutSubmit" v-if="isLogin">
        <div class="sub-botton">
          <van-button round block native-type="submit" >退出</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { logoutRequest } from '@/network/user'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'
import store from '@/store'
export default {
  setup () {
    const isLogin = computed(() => {
      return store.state.isLogin
    })
    // 返回按钮
    const onClickBack = () => history.back()
    const router = useRouter()
    const onLogoutSubmit = async () => {
      const res = await logoutRequest()
      if (res.status === 204) {
        window.localStorage.removeItem('xltoken')
        Toast.success('退出成功')
        store.commit('SET_IS_LOGIN', false)
        router.push({
          path: '/user'
        })
      } else {
        console.log(res)
      }
    }
    return {
      isLogin,
      onClickBack,
      onLogoutSubmit
    }
  }

}
</script>

<style lang="scss" scoped>
.setting {
  background: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .set-main {
    padding: 0 12px;
  }
}
</style>
