<template>
  <div class="fill-order">
    <van-loading color="#000000" v-if="loading"/>
    <div v-else>
      <van-nav-bar fixed :border="false" title="填写订单" placeholder>
          <template #left>
              <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
          </template>
        </van-nav-bar>
      <div class="order-main">
        <div class="contact-address" @click="selectAddress">
          <address-cell :type="type" :address="address" @onAddAddress="selectAddress"></address-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref, watch } from '@vue/runtime-core'
import { getOrderPreview } from '@/network/order'
import AddressCell from '@/components/address/addressList.vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import { Toast } from 'vant'
export default {
  components: { AddressCell },
  setup () {
    const onClickBack = () => {
      history.back()
    }
    const type = ref('order')
    const address = computed(() => {
      return store.state.contactAddress.data
    })
    // 监听loading
    const loading = ref(true)
    watch(() => address.value, (n, o) => {
      if (n) {
        loading.value = false
      } else {
        loading.value = true
      }
    })
    // 填写订单的地址和商品
    const getOrderPreviewData = async () => {
      const res = await getOrderPreview()
      if (res.status === 200) {
        let data = {}
        if (res.data.address.length === 0) {
          Toast.fail({
            message: '请添加收货地址！',
            duration: 1000
          })
        }
        res.data.address.forEach(item => {
          if (item.is_default) {
            data = res.data.address.filter(item => {
              return item.is_default ? 1 : 0
            })[0]
          } else {
            data = res.data.address[0]
          }
        })
        store.commit('SET_CONTACT_ADDRESS', data)
      }
    }
    // 选择地址
    const router = useRouter()
    const selectAddress = () => {
      router.push({
        name: 'address',
        params: { type: type.value }
      })
    }
    onBeforeMount(() => {
      getOrderPreviewData()
    })
    return {
      onClickBack,
      type,
      address,
      loading,
      selectAddress
    }
  }

}
</script>

<style lang="scss" scoped>
.fill-order {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #f9f9f9;
  .contact-address {
    padding: 12px 16px;
    position: relative;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    background: #ffffff;
  }
  .contact-address::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: repeating-linear-gradient(-45deg,var(--van-warning-color) 0,var(--van-warning-color) 20%,transparent 0,transparent 25%,var(--van-primary-color) 0,var(--van-primary-color) 45%,transparent 0,transparent 50%);
    background-size: 105px;
  }
}
</style>
