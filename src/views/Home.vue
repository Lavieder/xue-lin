<template>
  <div class="home">
    <search></search>
    <swipe :banner-data="bannerData" />
    <div class="guess-like">
      <div class="title">猜你喜欢</div>
      <guess-you-like :recommend-data="recommendData" />
    </div>
    <tab :tab-list="tabList" :tab-content="currentTabData" @onCurrentTabIndex="onCurrentTabIndex"></tab>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
import { getHomeAllData, getTabData } from 'network/home'
import Search from 'components/search/search'
import Swipe from 'components/home/swipe'
import GuessYouLike from 'components/home/guessYouLike'
import Tab from 'components/tab/tab'

export default {
  name: 'Home',
  components: {
    Search, Swipe, GuessYouLike, Tab
  },
  setup () {
    const bannerData = ref([])
    const recommendData = ref([])
    const tabContentData = reactive({
      recommend: [],
      sales: [],
      news: []
    })
    const tabList = ref([
      { id: 1, name: '推荐' },
      { id: 2, name: '热销' },
      { id: 3, name: '最新' }
    ])
    const currentTab = ref('recommend')
    const onCurrentTabIndex = (index) => {
      currentTab.value = (index === 0 ? 'recommend' : index === 1 ? 'sales' : 'news')
    }
    const currentTabData = computed(() => {
      return tabContentData[currentTab.value]
    })
    onMounted(async () => {
      const homeResult = await getHomeAllData()
      let res = await getTabData('recommend', 2)
      tabContentData.recommend = res.data.goods.data
      res = await getTabData('sales', 2)
      tabContentData.sales = res.data.goods.data
      res = await getTabData('new', 2)
      tabContentData.news = res.data.goods.data
      console.log(tabContentData)
      bannerData.value = homeResult.data.slides
      recommendData.value = homeResult.data.goods.data
      recommendData.value.length = 5
    })
    return {
      bannerData,
      recommendData,
      tabList,
      currentTabData,
      onCurrentTabIndex
    }
  }
}
</script>

<style lang="scss" scoped>
  .guess-like {
    margin-top: 30px;
    .title {
      padding: 0 12px;
      margin-bottom: 5px;
      font-size: $font-size-medium-x!important;
      font-weight: 600;
    }
  }
</style>
