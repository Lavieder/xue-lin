<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item replace v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      :name="tab.name"
      :badge="tab.path === '/cart' ? cartTotal === 0 ? '' : cartTotal : ''"
    >
      <span >{{tab.name}}</span>
      <template #icon='props'>
        <i :class="tab.iconfont+' '+ `iconfont ${props.active ? 'icon-active' : ''}`"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: {
  },
  props: {
    cartTotal: {
      type: Number,
      default: () => 0
    }
  },
  setup (props) {
    const route = useRoute()
    const tabs = reactive([
      {
        name: '首页',
        path: '/',
        iconfont: 'icon-home'
      },
      {
        name: '分类',
        path: '/category',
        iconfont: 'icon-shinshopfenlei'
      },
      {
        name: '购物车',
        path: '/cart',
        iconfont: 'icon-shinshopgouwuche'
      },
      {
        name: '我的',
        path: '/user',
        iconfont: 'icon-wode'
      }
    ])
    const active = computed({
      set: () => {},
      get: () => {
        return route.path
      }
    })
    return {
      active,
      tabs
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-tabbar::v-deep {
    height: 55px;
    box-shadow: -1px 0 10px #ececec;
    z-index: 1;
    .van-tabbar-item {
      color: #7a7a7a;
      transition: all 0.15s;
      .van-badge__wrapper  {
        .van-badge {
          background: $color-dot;
        }
      }
    }
    .van-tabbar-item--active {
      color: $color-theme;
    }
    .iconfont {
      font-size: 27px;
      transition: all 0.15s;
    }
    .icon-active {
      color: $color-theme;
    }
  }
</style>
