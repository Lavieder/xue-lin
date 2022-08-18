<template>
  <div class="address">
    <van-loading color="#000000" v-if="loading"/>
    <template v-else>
      <van-nav-bar fixed :border="false" title="管理地址" placeholder>
        <template #left>
            <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
        </template>
      </van-nav-bar>
      <div class="address-mian">
        <template v-if="list.length !== 0">
          <div class="cell-wrap" v-for="(item, index) in list" :key="index" @click="onChooseAddress(item)">
            <i class="iconfont icon-xuanze" v-if="caId===item.id"></i>
            <address-cell :address="item" :type="type" @onEdit="onEdit"></address-cell>
          </div>
        </template>
        <div class="address-list-bottom" @click="onAdd">
          <span>新增地址</span>
        </div>
      </div>
    </template>
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" :title="title" :editValue="addressDetail" @refreshAddress="getAddressList" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, watch } from '@vue/runtime-core'
import { getAddressData } from 'network/address'
import AddressCell from '@/components/address/addressList.vue'
import store from '@/store'
export default {
  components: { AddressCell },
  name: 'Address',
  setup () {
    const onClickBack = () => {
      history.back()
    }
    const route = useRoute()
    const transitionName = computed(() => {
      return route.meta.transitionName
    })
    const addressList = reactive({
      list: [],
      addressDetail: {},
      type: 'address'
    })
    // 填写订单选择地址
    const caId = computed(() => {
      if (route.params.type === 'order') {
        return store.state.contactAddress.aid
      }
      return false
    })
    // 监听loading
    const loading = ref(true)
    watch(() => addressList.list.length, (n, o) => {
      if (n) {
        loading.value = false
      } else {
        loading.value = true
      }
    })
    watch(() => caId.value, (n, o) => {
      onAddressList(n)
    })
    // 获取地址列表
    const getAddressList = async () => {
      const res = await getAddressData()
      if (res.status === 200) {
        if (res.data.data.length === 0) {
          loading.value = false
        }
        if (res.data.data.length === 1 && caId.value === undefined) {
          store.commit('SET_CONTACT_ADDRESS', res.data.data[0])
        }
        addressList.list = unshiftDefault(res.data.data)
        onAddressList(caId.value || 0)
      }
    }
    // 把默认地址排在最前位
    const unshiftDefault = (list) => {
      list.forEach((item, index) => {
        if (item.is_default) {
          const data = list.filter(item => {
            return item.is_default
          })[0]
          if (item.id === data.id) {
            list.unshift(list.splice(index, 1)[0])
          }
        }
      })
      return list
    }
    // 把选中地址排第一位
    const onAddressList = (n) => {
      if (!n) return false
      addressList.list.forEach((item, index) => {
        if (item.id === parseInt(n)) {
          addressList.list.unshift(addressList.list.splice(index, 1)[0])
        }
      })
    }
    // 选择收货地址
    const onChooseAddress = (item) => {
      if (caId.value) {
        history.back()
        store.commit('SET_CONTACT_ADDRESS', item)
      }
    }
    const router = useRouter()
    const title = ref('')
    const onAdd = () => {
      title.value = '新建收货地址'
      router.push({
        path: '/address/edit'
      })
    }
    const onEdit = (item) => {
      title.value = '编辑收货地址'
      addressList.addressDetail = item
      router.push({
        path: '/address/edit'
      })
    }
    onBeforeMount(() => {
      getAddressList()
    })
    return {
      onClickBack,
      ...toRefs(addressList),
      loading,
      onAdd,
      onEdit,
      transitionName,
      title,
      getAddressList,
      onChooseAddress,
      caId
    }
  }

}
</script>

<style lang="scss" scoped>
.address {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #ffffff;
  .address-mian {
    .cell-wrap {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      .icon-xuanze {
        margin-right: 10px;
        color: $color-dot;
      }
    }
    .address-cell:not(:last-child)::after {
      content: "";
      display: inline-block;
      border-bottom: 0.02667rem solid #e7e7e7;
      transform: scaleY(0.5);
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
    }
    .address-list-bottom {
      position: fixed;
      bottom: 12px;
      left: 0;
      right: 0;
      text-align: center;
      margin: 0 auto;
      background: $color-theme;
      border: none;
      width: 75%;
      height: 40px;
      line-height: 40px;
      color: #f7f7f7;
      border-radius: 20px;
    }
    .address-list-bottom:active {
      background: #bd9f63;
    }
  }
}
</style>
