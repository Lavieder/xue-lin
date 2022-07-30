<template>
  <div class="tab">
    <van-tabs v-model:active="active" @change="onTabChange" swipeable sticky shrink>
      <van-tab v-for="(item) in tabList" :title="item.name" :key="item.id">
        <div class="book-item-wrap">
          <template v-for="(item, index) in tabContent" :key="index">
            <book-item :book-item="item"></book-item>
          </template>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import { ref } from 'vue'
import BookItem from 'components/bookItem/bookItem'

export default {
  name: 'Tab',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    BookItem
  },
  props: {
    tabList: {
      type: Array,
      default: () => []
    },
    tabContent: {
      type: Array,
      default: () => []
    }
  },
  setup (props, context) {
    const { emit } = context
    console.log(props.tabContent)
    const active = ref(0)
    const onTabChange = (index) => {
      emit('onCurrentTabIndex', index)
    }
    return {
      active, onTabChange
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
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 12px;
      margin-bottom: 12px;
    }
  }
}
</style>
