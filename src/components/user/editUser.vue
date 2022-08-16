<template>
  <div class="edit-user">
    <van-nav-bar fixed :border="false" :title="title" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
      <template #right>
        <span @click="onDetermine">确定</span>
      </template>
    </van-nav-bar>
    <div class="edit-main">
      <van-field v-model="modelValue" clearable/>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { changeName, getUserInfo } from '@/network/user'
import store from '@/store'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    editValue: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const modelValue = ref(props.editValue)

    const onClickBack = () => {
      history.back()
    }
    // 确定
    const onDetermine = async () => {
      const res = await changeName({ name: modelValue.value })
      if (res.status === 204) {
        const resInfo = await getUserInfo()
        if (resInfo.status === 200) {
          store.commit('SET_USER_INFO', resInfo.data)
          window.localStorage.setItem('xluser', JSON.stringify(resInfo.data))
        }
      }
    }
    return {
      modelValue,
      onClickBack,
      onDetermine
    }
  }

}
</script>

<style lang="scss" scoped>
.edit-user {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: #f9f9f9;
  :deep(.van-cell) {
    .van-field__control {
      font-size: 18px;
    }
  }
}
</style>
