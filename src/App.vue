<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <template v-if="showTab">
    <tabbar></tabbar>
  </template>
  <template v-if="!showTab">
    <action-bar></action-bar>
  </template>
</template>

<script>
import { computed, onMounted, ref, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default ({
  components: {
  },
  setup () {
    const store = useStore()
    const showTab = ref(true)
    const currentPath = computed(() => {
      return store.getters.currentPath === 'detail'
    })
    const innerHeight = ref(window.innerHeight)
    // 监听页面高度和路由，如果页面高度缩小或者在详情页面时，就隐藏底部导航
    watch([innerHeight, currentPath], ([newHeight, newPath], [oldHeight, oldPath]) => {
      // console.log(newHeight, newPath)
      if (newHeight < oldHeight || newPath) {
        showTab.value = false // 隐藏tabbar
      } else {
        showTab.value = true // 显示tabbar
      }
    })
    // resize 监听浏览器窗口大小事件，窗口发生改变时执行
    window.addEventListener('resize', () => {
      innerHeight.value = window.innerHeight
    })
    onMounted(() => {
      innerHeight.value = window.innerHeight
    })
    return {
      showTab,
      currentPath
    }
  }
})
</script>

<style lang="scss">
#app {
  padding-bottom: 55px;
  box-sizing: border-box;
}
</style>
