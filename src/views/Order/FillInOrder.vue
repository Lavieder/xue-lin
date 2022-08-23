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
        <div class="card">
          <template v-for="(item,index) in cardData" :key="index">
            <card :item="item"></card>
          </template>
        </div>
        <div class="carts-total">
          <template v-for="(item,index) in cellList" :key="index">
            <van-cell :title="item.text" :value="`${index===0?'￥'+(total.price).toFixed(2):item.value}`"/>
          </template>
        </div>
        <div class="sub-carts">
          <van-submit-bar :price="total.price * 100" button-text="去付款" @submit="onSubmit" placeholder >
            <template #default>
              <span>共{{total.num}}件,</span>
            </template>
          </van-submit-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onActivated, ref } from '@vue/runtime-core'
import { createOrder, getOrderPreview } from '@/network/order'
import AddressCell from '@/components/address/addressList.vue'
import Card from '@/components/card/card.vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import { Toast } from 'vant'
export default {
  name: 'FillInOrder',
  components: { AddressCell, Card },
  setup () {
    const onClickBack = () => {
      history.back()
    }
    const type = ref('order')
    const address = computed(() => {
      return store.state.contactAddress.data
    })
    const way = computed(() => {
      return store.state.contactAddress.way
    })
    // 求数量和总价格
    const total = computed(() => {
      const sum = {
        price: 0,
        num: 0
      }
      cardData.value.forEach(item => {
        sum.num += parseInt(item.num)
        sum.price += parseInt(item.num) * parseFloat(item.goods.price)
      })
      return sum
    })
    const cellList = ref([
      { text: '商品金额', value: 0 },
      { text: '运费', value: '包邮' }
    ])
    // 监听loading
    const loading = ref(true)
    const cardData = ref([])
    // 填写订单的地址和商品
    const getOrderPreviewData = async () => {
      const res = await getOrderPreview()
      if (res.status === 200) {
        // 处理商品
        cardData.value = res.data.carts
        loading.value = false
        // 处理地址
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
        path: '/address'
      })
    }
    // 提交订单
    const onSubmit = async () => {
      const res = await createOrder(address.value.id)
      if (res.status === 200) {
        router.push({
          name: 'suborder',
          params: { price: total.value.price, orderId: res.data.id }
        })
      }
    }
    onActivated(() => {
      if (way.value === 'cart') {
        loading.value = true
        getOrderPreviewData()
        store.commit('SET_CONTACT_ADDRESS', 'order')
      }
    })
    return {
      onClickBack,
      selectAddress,
      onSubmit,
      type,
      address,
      loading,
      cardData,
      cellList,
      total
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
  background: #f5f5f5;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge
  overflow: -moz-scrollbars-none;
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
  .card {
    padding: 0 16px;
    margin-top: 12px;
    border-radius: 10px;
    background: #ffffff;
  }
  .carts-total {
    margin: 12px 0;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    :deep(.van-cell) {
      font-size: 16px;
      .van-cell__value {
        color: inherit;
      }
    }
    .van-cell:after {
      border: 0;
    }
  }
  .sub-carts {
    :deep(.van-submit-bar) {
      border-top: 1px solid #f5f5f5;
      padding: 3px 0;
      .van-submit-bar__text {
        margin-left: 5px;
        text-align: left;
        display: flex;
        align-items: center;
      }
      .van-submit-bar__price {
        color: $color-dot;
      }
      .van-submit-bar__button {
        background: $color-dot;
        border-radius: 7px;
      }
    }
  }
}
.fill-order::-webkit-scrollbar {
  display: none;
}
</style>
