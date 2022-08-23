<template>
  <div class="bargain">
    <van-nav-bar fixed :border="false" title="我的订单" placeholder>
      <template #left>
        <i class="iconfont icon-left" @click.stop="onClickBack"></i>
      </template>
    </van-nav-bar>
    <div class="bargin-main">
      <tab
        :tab-list="tabList"
        :activeIdx="actIdx"
        :tabContent="tabData"
        :loadStatus="loadStatus"
        :nullContent="nullContent"
        type='bargain'
        @onCurrentTabIndex="onCurrentTabIndex"
      ></tab>
    </div>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import { reactive, ref } from '@vue/reactivity'
import { computed, onActivated } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { getOrdersData } from 'network/order'
export default {
  components: { Tab },
  setup () {
    const onClickBack = () => {
      history.back()
    }
    const route = useRoute()
    const actIdx = computed(() => {
      let idx = parseInt(route.params.actIdx)
      if (idx === 4) {
        idx = 0
      }
      return idx
    })
    const tabList = ref([
      { id: 1, name: '全部' },
      { id: 2, name: '待付款' },
      { id: 3, name: '待收货' },
      { id: 4, name: '待评价' }
    ])
    const order = reactive({
      list: [],
      unpaid: [],
      notReceived: [],
      notRated: []
    })
    const status = ref('')
    const loadStatus = ref({
      loading: true
    })
    const onCurrentTabIndex = (index) => {
      getOrderList(index)
    }
    const tabData = computed(() => {
      return order[status.value]
    })
    //  获取订单列表
    const getOrderList = async (index) => {
      status.value = (index === 1 ? 'unpaid' : index === 2 ? 'notReceived' : index === 3 ? 'notRated' : 'list')
      let res = null
      // 全部
      if (index === 0) {
        res = await getOrdersData()
        if (res.status === 200) {
          order.list = res.data.data
          loadStatus.loading = false
        }
      }
      // 待付款
      if (index === 1) {
        res = await getOrdersData(1)
        if (res.status === 200) {
          order.unpaid = res.data.data
          loadStatus.loading = false
        }
      }
      // 待收货
      if (index === 2) {
        res = await getOrdersData(3)
        if (res.status === 200) {
          order.notReceived = res.data.data
          loadStatus.loading = false
        }
      }
      // 待评价
      if (index === 3) {
        res = await getOrdersData(4)
        if (res.status === 200) {
          order.notRated = res.data.data
          loadStatus.loading = false
        }
      }
    }
    const nullContent = computed(() => {
      const data = {
        icon: '',
        text: ''
      }
      switch (status.value) {
        case 'list':
          data.icon = 'icon-dingdan1'
          data.text = ''
          break
        case 'unpaid':
          data.icon = 'icon-weifukuan'
          data.text = '待付款'
          break
        case 'notReceived':
          data.icon = 'icon-daishouhuo'
          data.text = '待收货'
          break
        case 'notRated':
          data.icon = 'icon-weifukuan'
          data.text = '待评价'
          break
      }
      console.log(data)
      return data
    })
    onActivated(() => {
      onCurrentTabIndex(actIdx.value)
    })
    return {
      onClickBack,
      onCurrentTabIndex,
      tabList,
      actIdx,
      tabData,
      nullContent,
      loadStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.bargain {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background: #f9f9f9;
  .bargin-main {
    .tab {
      margin: 0;
      :deep(.van-tabs) {
        height: 621px;
        overflow-y: scroll;
        .van-sticky {
          position: fixed;
          top: 46px!important;
          left: 0;
          right: 0;
          z-index: 1;
          background: #ffffff;
        }
        .van-tabs__wrap {
          height: 30px;
          background: #ffffff;
          .van-tabs__nav {
            justify-content: space-between;
            .van-tab {
              width: 18%;
              margin-right: 0;
            }
            .van-tab--active {
              font-size: 14px!important;
              font-weight: normal;
              color: $color-dot;
            }
            .van-tabs__line {
              bottom: 15px;
              width: 40px;
              height: 1px;
              background: $color-dot!important;
            }
          }
        }
        .van-tabs__content  {
          padding-top: 30px;
          .card-wrap {
            padding: 0 12px;
          }
          .lazy-book {
            margin-top: 10px;
            padding: 0 12px;
            background: #ffffff;
            border-radius: 10px;
            .order-item {
              font-size: 15px;
              .title {
                border-bottom: 1px solid #e7e7e7;
                line-height: 35px;
                color: $color-dot;
                display: flex;
                justify-content: space-between;
                .iconfont span {
                  font-size: 15px;
                  margin-left: 10px;
                  color: $color-text;
                }
              }
              .order-goods {
                .van-card {
                  border-bottom: 1px solid #e7e7e7;
                }
                .van-card:not(:first-child) {
                  margin-top: 0;
                }
                .van-card__header {
                  justify-content: center;
                  .van-card__thumb {
                    margin-right: 15px;
                    width: 55px;
                    height: 55px;
                  }
                  .van-card__content {
                    min-height: initial;
                  }
                }
              }
              .order-action {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 10px 0;
                .cancel-order,
                .now-pay {
                  border: 1px solid $color-dot;
                  padding: 5px 10px;
                  color: $color-dot;
                  border-radius: 5px;
                }
                .cancel-order {
                  color: #8d8d8d;
                  border: 1px solid #8d8d8d;
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
