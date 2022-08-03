<template>
  <div class="home">
    <search></search>
    <swipe :banner-data="bannerData" />
    <div class="guess-like">
      <div class="title">猜你喜欢</div>
      <guess-you-like :recommend-data="recommendData" />
    </div>
    <tab
      :tab-list="tabList"
      :tab-content="currentTabData"
      @onCurrentTabIndex="onCurrentTabIndex"
      @onLoadBook="onLoadBook"
      :load-status="loadStatus"
    ></tab>
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
    // tab初始加载页码
    const initPage = 2
    let newPage = 2
    let oldTab = 'recommend'
    const pageStatus = {}
    // 加载状态
    const loadStatus = ref({
      loading: false,
      finished: false
    })
    const currentTab = ref('recommend')
    const onCurrentTabIndex = (index) => {
      currentTab.value = (index === 0 ? 'recommend' : index === 1 ? 'sales' : 'news')
      // 把页码存在对应tab页
      pageStatus[oldTab] = newPage
      return currentTab.value
    }
    const currentTabData = computed(() => {
      return tabContentData[currentTab.value]
    })
    const onLoadBook = async (active) => {
      const activeTab = onCurrentTabIndex(active)
      if (loadStatus.value.finished || tabContentData[activeTab].length >= 20) { return }
      if (pageStatus[activeTab]) {
        newPage = pageStatus[activeTab] + 1
      } else {
        if (activeTab !== oldTab) {
          newPage = initPage + 1
        } else {
          ++newPage
        }
      }
      const result = await getTabData(activeTab, newPage)
      if (result.status === 200) {
        const newData = result.data.goods.data
        tabContentData[activeTab].push(...newData)
        loadStatus.value.loading = false
        if (tabContentData.recommend.length >= 20 && tabContentData.sales.length >= 20 && tabContentData.news.length >= 20) {
          loadStatus.value.finished = true
        }
        oldTab = activeTab
      }
    }
    onMounted(async () => {
      const homeResult = await getHomeAllData()
      bannerData.value = homeResult.data.slides
      recommendData.value = homeResult.data.goods.data
      recommendData.value.length = 5
      let res = await getTabData('recommend', initPage)
      tabContentData.recommend = res.data.goods.data
      res = await getTabData('sales', initPage)
      tabContentData.sales = res.data.goods.data
      res = await getTabData('new', initPage)
      tabContentData.news = res.data.goods.data
    })
    return {
      bannerData,
      recommendData,
      tabList,
      currentTabData,
      onCurrentTabIndex,
      onLoadBook,
      loadStatus
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
