<template>
  <div class="submit-order">
    <van-nav-bar fixed :border="false" title="支付订单" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
    </van-nav-bar>
    <div class="price-wrap">
      <span class="currency">￥</span>
      <span class="price">{{price.integer}}</span>.<span class="split">{{price.decimal}}</span>
    </div>
    <div class="pay-type">
      <van-radio-group v-model="checked">
        <template v-for="(item,index) in cellList" :key="index">
          <van-radio :name="index" checked-color="#ff5050">
            <i :class="`iconfont ${item.icon}`"></i>
            <span>{{item.text}}</span>
          </van-radio>
        </template>
      </van-radio-group>
    </div>
    <div class="submit-pay">
      <span class="pay-btn" @click="onConfirmPay">确认付款</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { Dialog } from 'vant'
export default {
  setup () {
    const route = useRoute()
    const price = computed(() => {
      const price = {
        integer: 0,
        decimal: '00'
      }
      const total = parseFloat(route.params.price).toFixed(2)
      const index = total.indexOf('.')
      if (index === -1) {
        price.integer = route.params.price
        price.decimal = '00'
      } else {
        price.integer = total.slice(0, index)
        price.decimal = total.substr(index + 1, 2)
      }
      return price
    })
    // 返回
    const onClickBack = () => {
      Dialog.confirm({
        message: '确认放弃付款吗？',
        confirmButtonText: '继续支付',
        cancelButtonText: '确认离开'
      }).catch(() => {
        history.back()
      })
    }
    const cellList = ref([
      { text: '支付宝支付', icon: 'icon-zhifubao' },
      { text: '微信支付', icon: 'icon-weixinzhifu' }
    ])
    // 单选
    const checked = ref(0)
    const ckType = computed(() => {
      return checked.value ? 'wechatPay' : 'aliPay'
    })
    // 确认付款
    const onConfirmPay = () => {
      console.log('确认付款', ckType.value)
    }
    return {
      onClickBack,
      onConfirmPay,
      price,
      cellList,
      checked
    }
  }

}
</script>

<style lang="scss" scoped>
.submit-order {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #f9f9f9;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge
  overflow: -moz-scrollbars-none;
  :deep(.van-nav-bar) {
    background: #f9f9f9;
  }
  .price-wrap {
    padding: 20px;
    text-align: center;
    font-size: 40px;
    color: $color-dot;
    .split,
    .currency {
      font-size: 25px;
    }
  }
  .pay-type {
    padding: 0 12px;
    background: #ffffff;
    border-radius: 10px;
    height: 70%;
    :deep(.van-radio) {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid #f1f1f1;
      .van-radio__label {
        margin-left: 0;
        line-height: initial;
        display: flex;
        align-items: center;
        flex: 1;
        .iconfont  {
          font-size: 30px;
          margin-right: 15px;
        }
        span {
          font-size: 18px;
        }
        .icon-zhifubao {
          color: rgb(0,160,233);
        }
        .icon-weixinzhifu {
          color: rgb(9,187,7);
        }
      }
    }
  }
  .submit-pay {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    text-align: center;
    padding: 5px 12px;
    background: #ffffff;
    .pay-btn {
      display: inline-block;
      width: 100%;
      background: $color-dot;
      color: #ffffff;
      border-radius: 25px;
      line-height: 40px;
    }
    .pay-btn:active {
      background: #ee1b1b;
    }
  }
}
.submit-order::-webkit-scrollbar {
  display: none;
}
</style>
