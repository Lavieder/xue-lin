<template>
  <div class="register">
    <van-nav-bar fixed :border="false" title="账号快速注册" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
    </van-nav-bar>
    <div class="main">
      <div class="default-face">
        <img src="@/assets/images/default-avatar.png">
      </div>
      <div class="input-wrap">
        <van-form @submit="onRegisterSubmit">
          <van-cell-group inset >
            <van-field v-model="name" placeholder="请输入昵称" clearable/>
            <van-field v-model="email" placeholder="请输入邮箱" clearable />
            <van-field v-model="password" type="password" placeholder="请输入密码"/>
            <van-field v-model="password_confirmation" type="password"  placeholder="确认密码"/>
          </van-cell-group>
          <div class="remark">注册成功后将自动登录</div>
          <div class="sub-botton">
            <van-button round block native-type="submit" :disabled="disabled">注册</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { registerRequest, loginRequest, getUserInfo } from 'network/user'
import { Toast } from 'vant'
// import { useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'
import store from '@/store'

export default {
  setup () {
    const userInfo = reactive({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
    const disabled = computed(() => {
      return !(userInfo.name || userInfo.email || userInfo.password || userInfo.password_confirmation)
    })
    // 返回按钮
    const onClickBack = () => history.back()
    // 注册验证并提交信息
    // const router = useRouter()
    const onRegisterSubmit = async () => {
      const res = await registerRequest(userInfo)
      if (res.status === 201) {
        Toast.success('注册成功')
        setTimeout(() => {
          Toast.success('正在登录中...')
          loginSubmit()
        }, 1000)
      }
    }
    const loginSubmit = async () => {
      const loginData = { email: userInfo.email, password: userInfo.password }
      const res = await loginRequest(loginData)
      if (res.status === 200) {
        // 登录成功将token保存到本地存储里
        // console.log(res.data.access_token)
        store.commit('SET_IS_LOGIN', true)
        const resInfo = await getUserInfo()
        if (resInfo.status === 200) {
          window.localStorage.setItem('xluser', JSON.stringify(resInfo.data))
          store.commit('SET_USER_INFO', resInfo.data)
        }
        window.localStorage.setItem('xltoken', res.data.access_token)
        userInfo.name = ''
        userInfo.email = ''
        userInfo.password = ''
        userInfo.password_confirmation = ''
        Toast.success({
          message: '登录成功',
          duration: 1000
        })
        setTimeout(() => {
          history.go(-2)
          // router.push({ path: '/' })
        }, 1300)
      }
    }
    return {
      ...toRefs(userInfo),
      disabled,
      onRegisterSubmit,
      onClickBack
    }
  }

}
</script>

<style lang="scss" scoped>
.register {
  background: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index:4;
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .default-face {
      margin: 20px 0;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      overflow: hidden;
      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
    .input-wrap {
      width: 100%;
      .van-form {
        .van-cell {
          background: #f3f3f3;
          margin-bottom: 13px;
          border-radius: 30px;
          padding: 8px 16px;
        }
        .sub-botton {
          margin: 20px 16px;
          .van-button {
            background: $color-theme;
            color: #ffffff;
          }
        }
        .remark {
          padding: 0 16px;
          font-size: 13px;
          color: #7a7a7a;
        }
      }
    }
  }
}
</style>
