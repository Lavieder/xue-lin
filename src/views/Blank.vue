<template>
  <div class="blank">
    <van-loading color="#000000" v-if="loading"/>
  </div>
</template>
<script>
import store from '@/store'
import { computed, onActivated, onBeforeMount, ref, watch } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

export default ({
  name: 'Blank',
  setup () {
    const backStatu = computed(() => {
      return store.state.backStatu
    })
    const router = useRouter()
    const route = useRoute()
    const back = () => {
      if (backStatu.value) {
        history.go(-1)
      } else {
        routePush()
      }
    }
    const routePush = () => {
      router.push({
        name: 'detail',
        params: route.params.id
      })
    }
    // 监听loading
    const loading = ref(true)
    watch(() => route.params.id, (n, o) => {
      if (backStatu) {
        return false
      }
      if (n) {
        loading.value = false
      } else {
        loading.value = true
      }
    })
    onActivated(() => {
    })
    onBeforeMount(() => {
      back()
    })
    return {
      loading,
      routePush
    }
  }
})
</script>

<style scoped>
.blank {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  /* transform: translateX(100%);
  opacity: 0; */
}
.van-loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}
</style>
