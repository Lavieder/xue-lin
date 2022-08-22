<template>
  <div class="collects">
    <template v-if="isLogin">
      <van-loading color="#000000" v-if="loading"/>
      <template v-else>
        <van-nav-bar fixed :border="false" title="我的收藏" placeholder>
          <template #left>
              <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
          </template>
        </van-nav-bar>
        <div class="collect-mian">
          <template v-if="list.length !== 0">
            <div class="goods-item" v-for="(item,index) in list" :key="index">
              <van-swipe-cell ref="swipeCell">
                <card
                  :item="item"
                  :type="type"
                  @onGoToDetail="onGoToDetail"
                ></card>
                  <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(item.goods.id)" />
                  </template>
              </van-swipe-cell>
            </div>
          </template>
          <template v-else>
            <div class="nullContent">
              <i class="iconfont icon-shoucangliebiao"></i>
              <div>暂无收藏</div>
            </div>
          </template>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="nullContent">
        <i class="iconfont icon-weidenglu"></i>
        <div>暂未获取到您的信息</div>
        <div class="looking" @click="toLogin">登录</div>
      </div>
    </template>
  </div>
</template>

<script>
import { getCollectsData, collectsGoods } from 'network/collect'
import { computed, onActivated, reactive, ref, toRefs } from '@vue/runtime-core'
import card from '@/components/card/card.vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: { card },
  setup () {
    // 获取登录状态
    const store = useStore()
    const isLogin = computed(() => {
      return store.state.isLogin
    })
    // 未登录
    const toLogin = () => {
      router.push({
        path: '/login'
      })
    }
    const loading = ref(true)
    const collects = reactive({
      list: [],
      type: 'collect'
    })
    const getCollects = async () => {
      if (!isLogin.value) {
        return false
      }
      const res = await getCollectsData()
      if (res.status === 200) {
        loading.value = false
        collects.list = res.data.data
      }
    }
    // 返回
    const onClickBack = () => {
      history.back()
    }
    const router = useRouter()
    const onGoToDetail = (id) => {
      router.push({
        name: 'detail',
        params: { id: id }
      })
    }
    // 删除收藏
    const deleteGoods = async (id) => {
      collects.list.map((item, index) => {
        if (item.goods.id === id) {
          collects.list.splice(index, 1)
        }
        return collects.list
      })
      const res = await collectsGoods(id)
      getCollects()
      if (res.status !== 204) {
        Toast.fail({
          message: '删除商品异常',
          duration: 1000
        })
      }
    }
    onActivated(() => {
      getCollects()
    })
    return {
      loading,
      isLogin,
      ...toRefs(collects),
      toLogin,
      onClickBack,
      onGoToDetail,
      deleteGoods
    }
  }
}
</script>

<style lang="scss" scoped>
.collects {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #ffffff;
  .goods-item {
    :deep(.van-swipe-cell__right) {
      .delete-button {
        height: 100%;
        border: 0;
        background: $color-theme;
      }
    }
  }
  .collect-mian {
    padding: 0 12px;
    .nullContent {
      .icon-shoucangliebiao {
        font-size: 65px;
      }
    }
  }
}
</style>
