<template>
  <div class="home">
    <search></search>
    <swipe :banner-data="bannerData" />
    <div class="guess-like">
      <div class="title">猜你喜欢</div>
      <guess-you-like :recommend-data="recommendData" @onGoToDetail="onGoToDetail"/>
    </div>
    <tab
      :tab-list="tabList"
      :tab-content="currentTabData"
      @onCurrentTabIndex="onCurrentTabIndex"
      @onLoadBook="onLoadBook"
      @onGoToDetail="onGoToDetail"
      @onTabScroll="onTabScroll"
      :load-status="loadStatus"
    ></tab>
  </div>
</template>

<script>
import { computed, onActivated, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { getHomeAllData, getTabData } from 'network/home'
import Search from 'components/search/search'
import Swipe from 'components/home/swipe'
import GuessYouLike from 'components/home/guessYouLike'
import Tab from 'components/tab/tab'
import { useRouter } from 'vue-router'

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
    // 上拉加载
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
    // 商品详情
    const router = useRouter()
    const onGoToDetail = (id) => {
      router.push({
        path: `/detail/${id}`
      })
    }
    const onTabScroll = (scroll) => {
      // console.log(scroll)
    }
    onBeforeMount(() => {
    })
    // 只有activated 生命周期在组件使用keep-alive缓存后也能执行相应操作
    onActivated(() => {
    })
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
      loadStatus,
      onCurrentTabIndex,
      onLoadBook,
      onGoToDetail,
      onTabScroll
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  // width: 375px;
  // height: 612px;
  // overflow-y: scroll;
  // overflow-x: hidden;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge
  overflow: -moz-scrollbars-none;
  .guess-like {
    margin-top: 30px;
    .title {
      padding: 0 12px;
      margin-bottom: 5px;
      font-size: $font-size-medium-x!important;
      font-weight: 600;
    }
  }
}
// Hide scrollbar for Chrome, Safari and Opera
.home::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}
</style>
