<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <tabbar></tabbar>
</template>

<script>
import Tabbar from 'components/tabbar/tabbar'

export default ({
  components: {
    Tabbar
  },
  setup () {
  }
})
</script>

<style lang="scss">
#app {
  padding-bottom: 55px;
  box-sizing: border-box;
}
</style>
