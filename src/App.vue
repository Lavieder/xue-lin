<template>
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <keep-alive :exclude="exclude">
          <component :is="Component" :showTab="showTab" />
        </keep-alive>
      </transition>
    </router-view>
    <tabbar v-if="showTab" :cartTotal="cartTotal"></tabbar>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import store from './store'

export default ({
  components: {
  },
  setup () {
    const exclude = ref(['Detail', 'Blank'])
    const showTab = ref(true)
    const route = useRoute()
    const transitionName = computed(() => {
      return route.meta.transitionName
    })
    const currentPath = computed(() => {
      return route.path === '/register' || route.path === '/login'
    })
    // 获取购物车徽标数量
    const cartTotal = computed(() => {
      return store.state.cartTotal
    })
    const isLogin = computed(() => {
      return store.state.isLogin
    })
    const innerHeight = ref(window.innerHeight)
    // 监听页面高度和路由，如果页面高度缩小或者在详情页面时，就隐藏底部导航
    watch([innerHeight, currentPath], ([newHeight, newPath], [oldHeight, oldPath]) => {
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
    onBeforeMount(() => {
      if (isLogin.value) {
        store.dispatch('getCartDataTotal')
      }
    })
    onMounted(() => {
      innerHeight.value = window.innerHeight
    })
    return {
      exclude,
      showTab,
      currentPath,
      transitionName,
      cartTotal
    }
  }
})
</script>

<style lang="scss">
#app {
  padding-bottom: 55px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

</style>
