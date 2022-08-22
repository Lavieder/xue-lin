<template>
  <div class="user">
    <van-nav-bar>
      <template #right>
        <i class="iconfont icon-shezhi" @click="onGotoSetting"></i>
      </template>
    </van-nav-bar>
    <div class="user-main">
      <div class="main-content">
        <div class="face-login">
          <div class="face">
            <img :src="userInfo.avatar_url" v-if="userInfo">
            <img src='@/assets/images/default-avatar.png' v-else>
          </div>
          <div class="nickname" v-if="isLogin && userInfo">
            <p>{{userInfo.name}}</p>
            <p class="idnum">ID {{userInfo.id}}</p>
          </div>
          <router-link v-else to="/login" class="login-register">
            登录 <span>/</span> 注册
            <i class="iconfont icon-xiangyou"></i>
          </router-link>
        </div>
        <div class="collect mar" @click="onCollect">
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
      </div>
      <div class="other-wrap">
        <div class="user-cell" v-for="(item,index) in cellList" :key="index">
          <van-cell :title="item.text" is-link class="other-cell" @click="onClickCell(item.text)">
            <template #icon>
              <i :class="`iconfont left-icon ${item.icon}`"></i>
            </template>
          </van-cell>
          <span class="bottom-border"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onBeforeMount } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'User',
  setup () {
    const store = useStore()
    // 获取用户登录状态
    const isLogin = computed(() => {
      return store.state.isLogin
    })
    // 获取用户信息
    const userInfo = computed(() => {
      return store.state.userInfo
    })
    const router = useRouter()
    const onGotoSetting = () => {
      router.push({
        path: '/setting'
      })
    }
    const cellList = ref([
      { text: '个人中心', icon: 'icon-shinshopwode' },
      { text: '收货地址', icon: 'icon-shinshopshouhuodizhi' }
    ])
    const onClickCell = (text) => {
      if (!isLogin.value) {
        Toast.fail({
          message: '您还没有登录哦！',
          duration: 1000
        })
        return false
      }
      if (text === '个人中心') {
        router.push({
          path: '/usercenter'
        })
      } else if (text === '收货地址') {
        router.push({
          path: '/address'
        })
        store.commit('SET_CONTACT_ADDRESS', 'user')
      }
    }
    // 收藏
    const onCollect = () => {
      if (!isLogin.value) {
        Toast.fail({
          message: '您还没有登录哦！',
          duration: 1000
        })
        return false
      }
      router.push({
        path: '/collect'
      })
    }
    // 刷新token
    // const onRefreshToken = async () => {
    //   const res = await refreshToken()
    //   if (res.status === 200) {
    //     window.localStorage.setItem('xltoken', res.data.access_token)
    //   }
    // }
    onBeforeMount(() => {
      // onRefreshToken()
    })
    return {
      isLogin,
      userInfo,
      cellList,
      onGotoSetting,
      onClickCell,
      onCollect
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
    .main-content {
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
    }
    .other-wrap {
      margin-top: 15px;
      :deep(.user-cell) {
        position: relative;
        .van-cell {
          position: relative;
          padding: 12px;
          font-size: 15px;
          .left-icon {
            font-size: 20px;
          }
          .van-cell__title {
            margin-left: 10px;
          }
        }
        .other-cell::after {
          content: "";
          position: absolute;
          box-sizing: border-box;
          pointer-events: none;
          right: 12px;
          bottom: 0;
          left: 12px;
          border-bottom: 1px solid #cccccc;
          transform: scaleY(.5);
        }
      }
      .user-cell:last-of-type {
        border: 0;
      }
    }
  }
}
</style>
