<template>
  <div>
    User
  </div>
</template>

<script>
import { onBeforeMount, onActivated } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const setCurrentPath = () => {
      // console.log(route.name)
      store.commit('SET_CURRENT_PATH', route.name)
    }
    onActivated(() => {
      setCurrentPath()
    })
    onBeforeMount(() => {
      setCurrentPath()
    })
  }
}
</script>

<style>

</style>
