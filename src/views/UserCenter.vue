<template>
  <div class="usercenter">
    <van-nav-bar fixed :border="false" title="个人资料" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
    </van-nav-bar>
    <div class="user-detail">
      <van-cell-group v-if="userInfo">
        <van-cell class="avatat-wrap" title="头像" is-link >
          <template #value>
            <van-uploader :after-read="afterRead" />
            <div class="avatar">
              <img :src="userInfo.avatar_url">
            </div>
          </template>
        </van-cell>
        <van-cell title="昵称" :value="userInfo.name" is-link @click="onModifyName" >
        </van-cell>
        <van-cell title="邮箱" :value="userInfo.email" is-link @click="onModifyEmail" />
        <van-cell title="手机号"
          :value="userInfo.phone?userInfo.phone:'未绑定'"
          :is-link="userInfo.phone?false:true"
          @click="onModifyPhone"
        />
        <van-cell title="账号状态" :value="userInfo.is_locked?'锁定':'正常'"  />
        <van-cell title="ID" :value="userInfo.id" />
      </van-cell-group>
    </div>
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" :title="title" :editValue="editValue" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { Uploader } from 'vant'
import { computed, onBeforeMount, reactive, toRefs } from '@vue/runtime-core'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { getOssToken, uploaderAvatar } from '@/network/user'
export default {
  components: {
    [Uploader.name]: Uploader
  },
  setup () {
    const userInfo = computed(() => {
      return store.state.userInfo
    })
    const route = useRoute()
    const transitionName = computed(() => {
      return route.meta.transitionName
    })
    const onClickBack = () => {
      history.back()
    }
    // 上传头像
    const afterRead = async (file) => {
      console.log(file)
      const resToken = await getOssToken()
      if (resToken.status === 200) {
        const resUp = await uploaderAvatar({ avatar: file.content })
        console.log(resToken)
        console.log(resUp)
      }
    }
    const edit = reactive({
      title: '',
      editValue: ''
    })
    // 修改昵称
    const router = useRouter()
    const onModifyName = () => {
      edit.title = '修改昵称'
      edit.editValue = userInfo.value.name
      router.push({
        path: '/usercenter/edit'
      })
    }
    // 更好邮箱
    const onModifyEmail = () => {
      edit.title = '更换邮箱'
      edit.editValue = ''
      router.push({
        path: '/usercenter/edit'
      })
    }
    // 绑定手机
    const onModifyPhone = () => {
      edit.title = '绑定手机'
      edit.editValue = ''
      router.push({
        path: '/usercenter/edit'
      })
    }
    onBeforeMount(() => {
      getOssToken().then(res => {
        console.log(res)
      })
    })
    return {
      userInfo,
      transitionName,
      ...toRefs(edit),
      onClickBack,
      afterRead,
      onModifyName,
      onModifyEmail,
      onModifyPhone
    }
  }

}
</script>

<style lang="scss" scoped>
.usercenter {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #f9f9f9;
  .avatat-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    :deep(.van-cell__value) {
      position: initial;
      display: flex;
      justify-content: flex-end;
      .van-uploader {
        width: 375px;
        height: 80px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        opacity: 0;
        .van-uploader__wrapper {
          height: 100%;
          width: 100%;
          .van-uploader__upload {
            height: 100%;
            width: 100%;
            margin: 0;
          }
        }
      }
      .avatar {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
