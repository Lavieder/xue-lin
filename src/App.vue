<template>
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <keep-alive exclude="Detail">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <tabbar></tabbar>
</template>

<script>
import { computed, onMounted, ref, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default ({
  components: {
  },
  setup () {
    const store = useStore()
    const showTab = ref(true)
    const route = useRoute()
    const transitionName = ref('')
    const currentPath = computed(() => {
      return store.getters.currentPath === 'detail'
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
    watch(() => route.meta.index, (to, from) => {
      if (from === undefined) {
        transitionName.value = ''
      } else if (to === 5) {
        transitionName.value = 'slide-left'
      } else if (from === 5) {
        transitionName.value = 'slide-right'
      } else {
        transitionName.value = ''
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
      currentPath,
      transitionName
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

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.25s cubic-bezier(0.39, 0.575, 0.565, 1);
}
.slide-left-enter-from,
.slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slide-right-enter-from,
.slide-left-leave-to {
  transform: translate3d(-30%, 0, 0);
}
.slide-right-enter-to {
  transform: translate3d(0, 0, 0);
}
</style>
