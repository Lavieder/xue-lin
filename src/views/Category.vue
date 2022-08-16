<template>
  <div class="category">
    <van-nav-bar :title="title" fixed ref="navbar" />
    <div class="category-wrap">
      <van-sidebar v-model="active">
        <template v-for="(item,index) in categoryDate.categories" :key="item.id">
          <van-sidebar-item :title="item.name" @click="onSidebarChange(item.id, index)" />
        </template>
      </van-sidebar>
      <div class="category-content">
        <van-tabs class="tabs-wrap" sticky :offset-top="offsetTop+'px'">
          <van-tab v-for="(item,index) in tabName" :key="index" >
            <template #title>
              <span class="title-icon"  @click="onTabChange(index)">
                <span :class="tabActiveName===item ? 'tab-active' : ''">{{item}}</span>
                <span class="tab-icon">
                  <i class="iconfont icon-caretup" :class="tabActiveName===item&&type ? 'tab-active' : ''"></i>
                  <i class="iconfont icon-caretdown" :class="tabActiveName===item&&!type ? 'tab-active' : ''"></i>
                </span>
              </span>
            </template>
            <template v-if="categoryDate.goods.length > 0" >
              <van-card v-for="(item, index) in categoryDate.goods" :key="index"
                :price="item.price.toFixed(2)"
                :title="item.title"
                :thumb="item.cover_url"
                @click="onGoToDetail(item.id)"
              />
            </template>
            <template v-else>
              <div class="no-content">暂无内容...</div>
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, SidebarItem } from 'vant'
import { reactive, ref } from '@vue/reactivity'
import { getCateData } from 'network/category'
import { computed, getCurrentInstance, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem
  },
  setup () {
    const active = ref(0)
    // tab筛选激活状态，默认按销量升序排序, true:升序, false:降序
    const tabActive = ref(0)
    const type = ref(true)

    const title = ref('商品分类')
    const categoryDate = reactive({
      recommend_goods: [],
      categories: [],
      goods: []
    })
    const tabName = ref(['销量', '价格', '评论'])
    const recommendCate = { id: 't01', name: '推荐' }
    // 获取导航高度
    const offsetTop = ref(0)
    const navNode = getCurrentInstance()
    const getNavHeight = () => {
      offsetTop.value = navNode.refs.navbar.$el.offsetHeight
    }
    const tabActiveName = computed(() => {
      return tabName.value[tabActive.value]
    })

    // 把大分类里的小类合成一个新分类数组
    const resetCategory = (data) => {
      const newData = []
      data.forEach((item) => {
        item.children.forEach((item) => {
          newData.push(item)
        })
      })
      return newData
    }
    // 切换tab，对应排序内容
    let tmpName = tabName.value[tabActive.value]
    let num = 0
    const onTabChange = (index) => {
      tabActive.value = index
      const name = tabName.value[index]
      let column
      if (tmpName !== name) num = 0
      if (name === '销量') column = 'sales'
      if (name === '价格') column = 'price'
      if (name === '评论') column = 'comments_count'
      if (num + 1 === 1 || num + 1 === 3) {
        type.value = true
        num = 1
      } else if (num + 1 === 2) {
        type.value = false
        num = 2
      }
      tmpName = name
      categoryDate.goods.sort(onGoodsSort(column, type.value))
    }
    // 封装排序函数, col需要排序字段，type排序方式(true:升序， false:降序)
    const onGoodsSort = (col, type) => {
      if (type === undefined) {
        type = 1
      } else {
        type = (type) ? 1 : -1
      }
      return (a, b) => {
        a = a[col]
        b = b[col]
        if (a < b) return type * -1
        if (a > b) return type * 1
        return 0
      }
    }
    // 请求数据，分类切换
    const onSidebarChange = async (id, index, num) => {
      active.value = index
      let res = {}
      if (num === 1) {
        res = await getCateData('')
        categoryDate.recommend_goods = res.data.goods.data
        categoryDate.categories = resetCategory(res.data.categories)
        categoryDate.categories.unshift(recommendCate)
      }
      if (id === recommendCate.id) {
        categoryDate.goods = categoryDate.recommend_goods
      } else {
        res = await getCateData(id)
        categoryDate.goods = res.data.goods.data
      }
    }
    // 跳转到商品详情页面
    const router = useRouter()
    const onGoToDetail = (id) => {
      router.push({
        name: 'detail',
        params: { id: id }
      })
    }
    onMounted(async () => {
      onSidebarChange(recommendCate.id, active.value, 1)
      getNavHeight()
      onTabChange(0)
    })
    return {
      active,
      type,
      tabActiveName,
      title,
      categoryDate,
      tabName,
      tabActive,
      offsetTop,
      onTabChange,
      onSidebarChange,
      onGoToDetail
    }
  }

}
</script>

<style lang="scss">

.category {
  .category-wrap {
    margin-top: 46px;
    margin-bottom: 55px;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: -1;
    .van-sidebar {
      width: 110px;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      .van-sidebar-item {
        padding: 10px 15px;
        background: #ffffff;
        color: #7a7a7a;
        font-size: 13px;
        .van-sidebar-item__text {
          word-break: normal;
          line-height: 20px;
        }
      }
      .van-sidebar-item--select {
        color: #000000;
      }
      .van-sidebar-item--select:before {
        background-color: $color-theme;
      }
      .sidebar-placeholder {
        height: 20px;
      }
    }
    .category-content {
      flex: 1;
      overflow-y: scroll;
      padding-right: 12px;
      scrollbar-width: none; // Firefox
      -ms-overflow-style: none; // IE and Edge
      overflow: -moz-scrollbars-none;
      .van-tabs {
        .van-tabs__wrap {
          border-bottom: 1px solid #ececec;
          .title-icon {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .tab-icon {
              margin-left: -3px;
              display: flex;
              flex-direction: column;
              text-align: center;
              align-items: center;
              justify-content: center;
              line-height: 100%;
              transform: scale(0.3);
              i {
                height: 15px;
              }
            }
          }
        }
        .van-sticky--fixed {
          background: #ffffff;
        }
        .van-tab,
        .van-tab--active {
          // color: $color-theme;
          color: #7a7a7a;
        }
        .tab-active {
          color: $color-theme;
        }
        .van-tabs__line {
          display: none;
        }
        .van-card__thumb {
          width: 60px;
        }
        .van-card {
          border-radius: 7px;
          .van-card__content {
            justify-content: space-evenly;
            .van-card__title {
              font-size: $font-size-medium-x;
            }
            .van-card__price {
              font-size: $font-size-medium-x;
              font-weight: 600;
            }
            .van-card__price-integer {
              font-size: inherit;
            }
          }
        }
        .van-card:last-child {
          margin-bottom: 15px;
        }
      }
    }
    // Hide scrollbar for Chrome, Safari and Opera
    .van-sidebar::-webkit-scrollbar,
    .category-content::-webkit-scrollbar {
      display: none;
    }
  }

}
</style>
