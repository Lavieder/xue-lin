<template>
  <div class="login">
    <van-nav-bar fixed :border="false" title="用户快速登录" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
    </van-nav-bar>
    <div class="main">
      <div class="default-face">
        <img src="@/assets/images/default-avatar.png">
      </div>
      <div class="input-wrap">
        <van-form @submit="onSubmit">
          <van-cell-group inset >
            <van-field v-model="email" placeholder="请输入邮箱" clearable />
            <van-field v-model="password" type="password" placeholder="请输入密码"/>
            <van-checkbox v-model="checked" label-disabled>
              <span>登录即代表您已同意<a>《学林隐私政策》</a></span>
            </van-checkbox>
          </van-cell-group>
          <div class="sub-botton">
            <van-button round block native-type="submit" :disabled="disabled">登录</van-button>
          </div>
        </van-form>
      </div>
      <div class="other">
        <router-link to="/register">新用户注册</router-link>
        <router-link to="/forgot">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { loginRequest, getUserInfo } from 'network/user'
import { Toast } from 'vant'
// import { useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'
import store from '@/store'

export default {
  setup () {
    const userInfo = reactive({
      email: '',
      password: ''
    })
    // 勾选隐私协议
    const checked = ref(false)
    const onRadioChange = () => {
      checked.value = !checked.value
      console.log(checked.value)
    }
    const disabled = computed(() => {
      return !((userInfo.email || userInfo.password) && checked.value)
    })
    // 返回按钮
    const onClickBack = () => {
      store.commit('SET_BACK_STATU', true)
      history.go(-1)
    }
    // 登录验证并提交信息
    // const router = useRouter()
    const onSubmit = async () => {
      const res = await loginRequest(userInfo)
      // console.log(res)
      if (res.status === 422) {
        const errors = res.data.errors
        const errorText = errors[Object.keys(errors)[0]]
        Toast.fail(errorText[0])
        return
      }
      if (res.status === 200) {
        // 登录成功将token保存到本地存储里
        // console.log(res.data.access_token)
        store.commit('SET_IS_LOGIN', true)
        window.localStorage.setItem('xltoken', res.data.access_token)
        const resInfo = await getUserInfo()
        if (resInfo.status === 200) {
          window.localStorage.setItem('xluser', JSON.stringify(resInfo.data))
          store.commit('SET_USER_INFO', resInfo.data)
        }
        userInfo.email = ''
        userInfo.password = ''
        checked.value = false
        Toast.success({
          message: '登录成功',
          duration: 1000
        })
        setTimeout(() => {
          history.back()
          // router.push({ path: '/user' })
        }, 1300)
      }
    }
    return {
      ...toRefs(userInfo),
      checked,
      disabled,
      onRadioChange,
      onSubmit,
      onClickBack
    }
  }

}
</script>

<style lang="scss" scoped>
.login {
  background: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index:2;
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
        .van-checkbox::v-deep {
          font-size: 12px;
          display: flex;
          align-items: center;
          color: #7a7a7a;
          .van-checkbox__icon {
            font-size: 14px;
            .van-icon {
              line-height: normal;
            }
          }
          .van-checkbox__icon--checked {
            .van-icon {
              background-color: $color-theme;
              border-color: $color-theme;
            }
          }
          .van-checkbox__label {
            margin-left: 10px;
            color: #7a7a7a;
            line-height: normal;
            a {
              color: #1c65d3;
            }
          }
        }
      }
    }
    .other {
      padding: 0 35px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      a {
        color: #7a7a7a;
      }
    }
  }
}
</style>
