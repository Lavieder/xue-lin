<template>
  <div class="register">
    <van-nav-bar fixed :border="false" title="快速注册" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
    </van-nav-bar>
    <div class="main">
      <div class="default-face">
        <img src="@/assets/images/default-face.png">
      </div>
      <div class="input-wrap">
        <van-form @submit="onSubmit">
          <van-cell-group inset >
            <van-field v-model="name" placeholder="请输入昵称" clearable/>
            <van-field v-model="email" placeholder="请输入邮箱" clearable />
            <van-field v-model="password" type="password" placeholder="请输入密码"/>
            <van-field v-model="password_confirmation" type="password"  placeholder="确认密码"/>
          </van-cell-group>
          <div class="sub-botton">
            <van-button round block native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { registerRequest } from 'network/user'

export default {
  setup () {
    const userInfo = reactive({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
    const showNotify = ref(false)
    const notifyText = ref('')
    const onClickBack = () => history.back()
    // 注册验证并提交信息
    const onSubmit = async () => {
      await registerRequest(userInfo)
      if (userInfo.password !== userInfo.password_confirmation) {
        showNotify.value = true
        notifyText.value = '两次密码不一致'
      } else if (userInfo.name === '') {
        showNotify.value = true
        notifyText.value = '昵称不能为空'
      } else if (userInfo.email === '') {
        showNotify.value = true
        notifyText.value = '邮箱不能为空'
      }
      if (showNotify.value) {
        showNotify.value = false
      }
    }
    return {
      ...toRefs(userInfo),
      showNotify,
      notifyText,
      onSubmit,
      onClickBack
    }
  }

}
</script>

<style lang="scss" scoped>
.register {
  background: #ffffff;
  // width: 100%;
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // z-index:4;
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
      }
    }
  }
}
</style>
