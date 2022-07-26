<template>
  <div class="home">
    <search></search>
    <swiper :banner-data="bannerData" :recommend-data="recommendData"></swiper>
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
    const recommendData = ref([])
    onMounted(async () => {
      const result = await getHomeAllData()
      console.log(result)
      bannerData.value = result.data.slides
      recommendData.value = result.data.goods.data
      recommendData.value.length = 5
      recommendData.value.splice(0, 0, '')
      recommendData.value.push('')
      console.log(recommendData.value)
    })
    return {
      bannerData,
      recommendData
    }
  }
}
</script>

<style scoped>
</style>
