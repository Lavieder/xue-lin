<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="tab in tabs" :key="tab.path" :to="tab.path">
        <span>{{tab.name}}</span>
        <template #icon='props'>
          <i :class="tab.iconfont+' '+ `iconfont ${props.active ? icon.active : ''}`"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { Tabbar, TabbarItem } from 'vant'

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  setup () {
    const active = ref(0)
    const icon = {
      active: 'icon-active'
    }
    const tabs = reactive([
      {
        name: '首页',
        path: '/home',
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
    return {
      icon,
      active,
      tabs
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-tabbar {
    height: 55px;
    .van-tabbar-item {
      color: #7a7a7a;
    }
    .van-tabbar-item--active {
      font-size: 14px;
      color: black;
    }
    .iconfont {
      font-size: 28px;
    }
    .icon-active {
      color: $color-theme;
      font-size: 30px;
    }
  }
</style>
