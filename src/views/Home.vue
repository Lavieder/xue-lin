<template>
  <div class="home">
    <search></search>
    <swiper :banner-data="bannerData"></swiper>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getHomeAllData } from 'network/home'
import Search from 'components/search/search'
import Swiper from 'components/home/swiper'

export default {
  name: 'Home',
  components: {
    Search, Swiper
  },
  setup () {
    const bannerData = ref([])
    onMounted(async () => {
      const result = await getHomeAllData()
      bannerData.value = result.data.slides
    })
    return {
      bannerData
    }
  }
}
</script>

<style scoped>
</style>
