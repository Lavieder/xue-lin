<template>
  <div class="user">
    <van-nav-bar>
      <template #right>
        <i class="iconfont icon-shezhi" @click="onGotoSetting"></i>
      </template>
    </van-nav-bar>
    <div class="user-main">
      <div class="face-login">
        <div class="face">
          <img src="@/assets/images/default-face.png">
        </div>
        <div class="nickname" v-if="isLogin">
          <p>若梦</p>
          <p class="idnum">ID 1548678</p>
        </div>
        <router-link v-else to="/login" class="login-register">
          登录 <span>/</span> 注册
          <i class="iconfont icon-xiangyou"></i>
        </router-link>
      </div>
      <div class="collect mar">
        <span>收藏</span>
        <i class="iconfont icon-xiangyou"></i>
      </div>
      <div class="deal">
        <div class="deal-title">
          我的交易
        </div>
        <div class="deal-wrap">
          <div class="deal-cate">
            <i class="iconfont icon-daifukuan"></i>
            <span>待付款</span>
          </div>
          <div class="deal-cate">
            <i class="iconfont icon-shouhuo"></i>
            <span>待收货</span>
          </div>
          <div class="deal-cate">
            <i class="iconfont icon-pingjia"></i>
            <span>待评价</span>
          </div>
          <div class="deal-cate">
            <i class="iconfont icon-dingdan"></i>
            <span>全部订单</span>
          </div>
        </div>
      </div>
      <div class="other-wrap">
        <div class="user-center mar">
          <div class="text">
            <i class="iconfont icon-shinshopwode"></i>
            <span>个人中心</span>
          </div>
          <i class="iconfont icon-xiangyou"></i>
        </div>
        <div class="address mar">
          <div class="text">
            <i class="iconfont icon-shinshopshouhuodizhi"></i>
            <span>收货地址</span>
          </div>
          <i class="iconfont icon-xiangyou"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onActivated, computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'User',
  setup () {
    const store = useStore()
    const isLogin = computed(() => {
      return store.state.isLogin
    })
    const router = useRouter()
    const onGotoSetting = () => {
      router.push({
        path: '/setting'
      })
    }
    onActivated(() => {
    })
    onBeforeMount(() => {
    })
    return {
      isLogin,
      onGotoSetting
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  background: #ffffff;
  .van-nav-bar {
    .van-nav-bar__right {
      .iconfont {
        font-size: $font-size-large-x;
      }
    }
  }
  .van-hairline--bottom:after {
    border: none;
  }
  .user-main {
    padding: 0 12px;
    .face-login {
      display: flex;
      flex-direction: row;
      align-items: center;
      .face {
        width: 55px;
        height: 55px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .nickname {
        .idnum {
          margin-top: 7px;
          font-size: 12px;
          background: #e5e5e5;
          padding: 1px 8px;
          border-radius: 10px;
          color: #5e5e5e;
        }
      }
      .nickname,
      .login-register {
        margin-left: 15px;
        .iconfont {
          font-size: $font-size-small;
          margin-left: 10px;
          line-height: 21px;
        }
      }
    }
    .collect {
      margin-top: 20px;
      background: #f8d7a6;
      box-shadow: -1px 0 5px #cccccc;
      border-radius: 5px;
    }
    .deal {
      padding: 12px;
      margin-top: 20px;
      box-shadow: -1px 0 5px #cccccc;
      border-radius: 5px;
      .deal-title {
        font-size: 16px;
        font-weight: 500;
      }
      .deal-wrap {
        margin-top: 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        .deal-cate {
          display: flex;
          flex-direction: column;
          align-items: center;
          .iconfont {
            font-size: 30px;
            margin-bottom: 5px;
          }
        }
      }
    }
    .mar {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text  {
        span {
          font-size: $font-size-medium;
        }
        .iconfont {
          font-size: 20px;
          margin-right: 10px;
        }
      }
      .iconfont {
        font-size: 14px;
      }
    }
    .other-wrap {
      margin-top: 15px;
      .user-center,
      .address {
        padding: 15px 0;
      }
      .user-center {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
