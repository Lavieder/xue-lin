<template>
  <div class="tab">
    <van-tabs v-model:active="active" @change="onTabChange" swipeable sticky shrink @scroll="onScroll">
      <van-tab v-for="(item,index) in tabList" :title="item.name" :key="index" >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :offset="offset"
          :immediate-check="false"
          @load="onLoad"
        >
          <div class="book-item-wrap" ref="list" v-if="type !== 'bargain'">
            <lazy-component class="lazy-book" v-for="(item, index) in tabContent" :key="index">
              <book-item :book-item="item" @onGoToDetail="onGoToDetail"></book-item>
            </lazy-component>
          </div>
          <div class="card-wrap" v-else>
            <template v-if="tabContent.length !== 0">
              <lazy-component class="lazy-book" v-for="(item, index) in tabContent" :key="index">
                <div class="order-item">
                  <div class="title">
                    <i class="iconfont icon-dingdan1"><span>在线商城</span></i>
                    <span>等待付款</span>
                  </div>
                  <div class="order-goods">
                    <template v-for="(good,index) in item.orderDetails.data" :key="index">
                      <card
                        :item="good"
                        type="bargain"
                      ></card>
                    </template>
                  </div>
                  <div class="order-action">
                    <div class="cancel-order">取消订单</div>
                    <div class="now-pay">立即付款</div>
                  </div>
                </div>
              </lazy-component>
            </template>
            <template v-else>
              <div class="nullContent">
                <i :class="`iconfont ${nullContent.icon}`"></i>
                <div>您还没有{{nullContent.text}}订单</div>
              </div>
            </template>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { onActivated, onMounted, ref } from 'vue'
import BookItem from 'components/bookItem/bookItem'
import Card from 'components/card/card'

export default {
  name: 'Tab',
  components: {
    BookItem, Card
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default: () => []
    },
    tabContent: {
      type: Array,
      default: () => []
    },
    loadStatus: {
      type: Object,
      default: () => {}
    },
    activeIdx: {
      type: Number,
      default: 0
    },
    nullContent: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['onCurrentTabIndex', 'onLoadBook', 'onGoToDetail', 'onTabScroll'],
  setup (props, context) {
    // const instance = getCurrentInstance()
    const { emit } = context
    const active = ref(0)
    const loading = ref(false)
    const finished = ref(false)
    const offset = ref(-73)
    const onTabChange = (index) => {
      active.value = index
      emit('onCurrentTabIndex', index)
    }
    const onLoad = () => {
      emit('onLoadBook', active.value)
      loading.value = props.loadStatus.loading
      if (props.type !== 'bargain') {
        finished.value = props.loadStatus.finished
      }
    }
    const onGoToDetail = (id) => {
      emit('onGoToDetail', id)
    }
    const onScroll = (scroll) => {
      // scrollTop: number, isFixed: boolean
      // console.log(scroll)
      emit('onTabScroll', scroll)
    }
    onActivated(() => {
      active.value = props.activeIdx
    })
    onMounted(() => {
      // window.addEventListener('scroll', () => {
      //   console.log(instance.refs.list[0].offsetHeight)
      //   console.log(document.body)
      //   const height = instance.refs.list[0].offsetHeight
      //   const scrollTop = document.documentElement.scrollTop
      //   const scrollHeight = document.documentElement.scrollHeight
      //   console.log('height: ' + height, 'scrollTop: ' + scrollTop, 'scrollHeight: ' + scrollHeight, '差: ' + (height - scrollTop))
      // }, true)
    })
    return {
      active, onTabChange, loading, finished, onLoad, offset, onGoToDetail, onScroll
    }
  }
}
</script>

<style lang="scss">
.tab {
  margin: 0.5rem 0;
  .van-tabs {
    .van-sticky--fixed {
      box-shadow: 0px 0px 10px #cccccc;
      background: #ffffff;
    }
    .van-tabs__wrap {
      padding: 0 12px;
    }
  }
  .van-tab--active {
    font-size: $font-size-large!important;
    font-weight: 800;
    transition-duration: 0.3s;
  }
  .van-tabs__line {
    bottom: 0.5rem;
    width: 0.5rem;
    height: 0.1rem;
    background: $color-theme!important;
  }
  .van-tabs__nav--shrink {
    padding-left: 0;
    padding-right: 0;
  }
  .van-tab--shrink {
    width: 36px;
    margin-right: 30px;
    padding: 0;
  }
  .van-tabs__content {
    .book-item-wrap {
      padding: 0 12px;
      margin-bottom: 12px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .lazy-book {
        width: 48%;
        margin-top: 12px;
      }
      .van-list__loading,
      .van-list__finished-text {
        width: 100%;
      }
    }
  }
}
</style>
