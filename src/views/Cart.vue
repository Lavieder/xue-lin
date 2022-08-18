<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed ref="navbar" :border="false" placeholder />
    <template v-if="isLogin">
      <van-loading color="#000000" v-if="loading"/>
      <template v-else>
        <template v-if="list.length!==0">
          <div class="cart-wrap" >
            <div class="cart-item" v-for="(item, index) in list" :key="index">
              <div class="select-input" >
                <input type="checkbox" ref="checkbox"
                  :id="'ck'+index"
                  :checked="item.is_checked"
                  @click.stop="onOnlyChecked($event,item.id)"
                />
                <label :for="'ck'+index"></label>
              </div>
              <van-swipe-cell ref="swipeCell">
                <van-card
                  :price="item.goods.price.toFixed(2)"
                  :title="item.goods.title"
                  :desc="item.goods.description"
                  :thumb="item.goods.cover_url"
                  @click="onGoToDetail(item.goods_id)"
                >
                  <template #bottom>
                    <van-stepper v-model="item.num"
                      integer
                      min="1"
                      :max="item.goods.stock"
                      :name="item.id"
                      @click.stop="onStepperClick"
                      @blur="onNumBlur(item.id)"
                      @change="onChangeNum"
                      @plus="onPlusNum"
                      @minus="onMinusNum"
                      @overlimit="onOverLimit"
                      :long-press="false"
                    />
                  </template>
                </van-card>
                  <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(item.id)" />
                  </template>
              </van-swipe-cell>
            </div>
          </div>
          <van-submit-bar :disabled="checked.length===0" :price="totalPrice" :button-text="`结算(${checkedNum})`" @submit="onSubmit" v-if="showTab && list.length!==0">
            <div class="allChecked-wrap" @click.prevent="onAllChecked" >
              <div class="select-input" >
                <input type="checkbox" v-model="allChecked" id="allChecked" />
                <label for="allChecked"></label>
              </div>
              <label for="allChecked">全选</label>
            </div>
          </van-submit-bar>
        </template>
        <div class="nullCart" v-if="list.length===0">
          <i class="iconfont icon-shinshopgouwuche"></i>
          <div>购物车还是空的</div>
          <div class="looking" @click="onLooking">随便看看</div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="nullCart">
        <i class="iconfont icon-weidenglu"></i>
        <div>暂未获取到您的信息</div>
        <div class="looking" @click="toLogin">登录</div>
      </div>
    </template>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { computed, onActivated, onMounted, watch } from '@vue/runtime-core'
import { allChecked, checkedList, onOriginGoods, onAllSelect, onOnlySelect } from 'mixins/cart'
import { getCartGoods, modifyCartNum, checkedCartGoods, deleteCartGoods } from 'network/cart'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

export default {
  props: {
    showTab: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    // 检查是否登录
    const isLogin = computed(() => {
      return store.state.isLogin
    })
    const cartTotal = computed(() => {
      return store.state.cartTotal
    })
    const cartData = reactive({
      list: [],
      checked: []
    })
    // 监听loading
    const loading = ref(true)
    watch(() => cartData.list.length, (n, o) => {
      if (n === o) {
        loading.value = false
      } else {
        loading.value = true
        if (n || n === 0) {
          loading.value = false
        }
      }
    })
    // 获取购物车商品列表
    const getCartData = async () => {
      if (!isLogin.value) {
        return false
      } else {
        const res = await getCartGoods()
        if (res.status === 200) {
          if (res.data.data.length === 0) {
            loading.value = false
          }
          cartData.list = res.data.data
          cartData.checked = initCheckedList(cartData.list)
          getTotal()
          onOriginGoods(cartIDList(cartData.list), initCheckedList(cartData.list))
        }
      }
    }
    // 处理cartData数据，把所有购物车商品id和选中id分别生成一个数组，以便选中判断
    const cartIDList = (list) => {
      return list.map(item => {
        return item.id
      })
    }
    const initCheckedList = (list) => {
      return list.filter(item => {
        return item.is_checked
      }).map(item => {
        return item.id
      })
    }
    // 全选
    const checkbox = ref(null)
    const onAllChecked = async () => {
      onAllSelect(checkbox.value)
      cartData.checked = [...checkedList]
      await checkedCartGoods({ cart_ids: checkedList })
    }
    // 单选
    const onOnlyChecked = async (e, id) => {
      onOnlySelect(e, id)
      cartData.checked = [...checkedList]
      await checkedCartGoods({ cart_ids: checkedList })
    }
    // 删除商品
    const swipeCell = ref(null)
    const deleteGoods = async (id) => {
      cartData.list.map((item, index) => {
        if (item.id === id) {
          store.commit('SET_CART_TOTAL', cartTotal.value - item.num)
          cartData.list.splice(index, 1)
        }
        return cartData.list
      })
      swipeCell.value.forEach(item => {
        item.close()
      })
      const res = await deleteCartGoods(id)
      getCartData()
      if (res.status !== 204) {
        console.log('删除商品异常')
      }
    }
    // 购物车 根据选中数量计算价格
    const checkedNum = ref(0)
    const totalPrice = computed(() => {
      let sumPrice = 0
      checkedNum.value = 0
      cartData.list.filter(item => {
        return cartData.checked.includes(item.id)
      }).forEach(item => {
        checkedNum.value += item.num
        sumPrice += (parseFloat(item.goods.price) * parseInt(item.num)) * 100
      })
      return sumPrice
    })
    // 获取商品总数量
    const getTotal = () => {
      let sum = 0
      cartData.list.forEach(item => {
        sum += item.num
      })
      store.commit('SET_CART_TOTAL', sum)
    }
    // 输入数量框焦点状态
    let blur = true
    const onNumBlur = (id) => {
      blur = true
      let sum = 0
      cartData.list.forEach(goods => {
        if (goods.id === id) {
          onChangeNum(goods.num, { name: id })
        }
        sum += goods.num
      })
      store.commit('SET_CART_TOTAL', sum)
    }
    const onStepperClick = () => {}
    // 更改商品数量
    const onChangeNum = async (num, item) => {
      event.stopPropagation()
      if (num === '') num = 1
      if (blur) {
        const res = await modifyCartNum(item.name, { num: num })
        if (res.status !== 204) {
          console.log('onChangeNum出错')
        }
      }
    }
    // 点击增加按钮 增加数量
    const onPlusNum = () => {
      event.stopPropagation()
      let sum = 0
      sum = cartTotal.value + 1
      store.commit('SET_CART_TOTAL', sum)
    }
    // 点击减少按钮 减少数量
    const onMinusNum = () => {
      event.stopPropagation()
      let sum = 0
      sum = cartTotal.value - 1
      store.commit('SET_CART_TOTAL', sum)
    }
    // 点击不可以的按钮取消冒泡
    const onOverLimit = () => {
      event.stopPropagation()
    }
    // 结算订单
    const onSubmit = () => {
      if (cartData.checked.length === 0) {
        Toast.fail('未选中商品！')
      } else {
        router.push({
          path: '/fillorder'
        })
      }
    }
    // 去详情页
    const onGoToDetail = (id) => {
      router.push({
        name: 'detail',
        params: { id: id }
      })
    }
    // 购物车为空时路径跳转
    const onLooking = () => {
      router.push({
        path: '/'
      })
    }
    // 未登录
    const toLogin = () => {
      router.push({
        path: '/login'
      })
    }
    onActivated(() => {
      getCartData()
    })
    onMounted(() => {
    })
    return {
      ...toRefs(cartData),
      isLogin,
      checkbox,
      allChecked,
      onOnlySelect,
      onAllChecked,
      onOnlyChecked,
      getTotal,
      onSubmit,
      onChangeNum,
      onNumBlur,
      onStepperClick,
      onPlusNum,
      onMinusNum,
      onOverLimit,
      deleteGoods,
      totalPrice,
      checkedNum,
      onGoToDetail,
      onLooking,
      toLogin,
      loading,
      swipeCell
    }
  }
}
</script>

<style lang="scss" scoped>
.cart::v-deep {
  background: #ffffff;
  .cart-wrap {
    padding: 46px 15px 106px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: calc(100% + 1px);
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none; // Firefox
    -ms-overflow-style: none; // IE and Edge
    overflow: -moz-scrollbars-none;
    .cart-item:last-of-type {
      border: none;
    }
    .cart-item {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e7e7e7;
      .van-swipe-cell {
        flex: 1;
      }
      .swipeCell {
        .van-swipe-cell__wrapper {
          transform: translate3d(0,0,0) !important;
          transition: 0s !important;
        }
      }
      .van-card {
        flex: 1;
        background: #ffffff;
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        .van-card__header {
          flex: 1;
          .van-card__content {
            justify-content: space-evenly;
            .van-card__title {
              width: 220px;
              font-size: $font-size-medium;
              font-weight: 600;
            }
            .van-card__desc {
              flex: none;
              font-size: $font-size-small;
              width: 220px;
              color: #969696;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              letter-spacing: 1px;
              line-height: 18px;
              margin: 8px 0;
            }
            .van-card__price {
              font-size: $font-size-medium-x;
              color: $color-theme;
              font-weight: 600;
              .van-card__price-currency {
                font-size: $font-size-small-s;
                margin-right: 3px;
              }
            }
          }
          .van-card__bottom {
            margin-right: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            .van-stepper {
              button {
                height: 20px;
                width: 20px;
                background: transparent;
                color: #000000;
              }
              input {
                margin: 0 5px;
                height: 15px;
                border-radius: 0.13333rem;
                font-size: $font-size-small-s;
              }
              .van-stepper__minus:before,
              .van-stepper__plus:before {
                width: 50%;
                height: 2px;
                border-radius: 2px;
              }
              .van-stepper__minus:after,
              .van-stepper__plus:after {
                width: 2px;
                height: 50%;
                border-radius: 2px;
              }
              .van-stepper__minus--disabled,
              .van-stepper__plus--disabled {
                color: #bdbdbd;
              }
            }
          }
        }
      }
      .van-swipe-cell__right {
        .delete-button {
          height: 100%;
          border: 0;
          background: $color-theme;
        }
      }
    }
  }
  .cart-wrap::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0;
  }
  .van-submit-bar {
    margin-bottom: 55px;
    border-top: 1px solid #f5f5f5;
    .van-submit-bar__bar {
      padding: 0 15px;
      .van-checkbox {
        margin-left: 5px;
      }
      .van-submit-bar__price {
        color: $color-theme;
      }
      .van-submit-bar__button {
        background: $color-theme;
        border-radius: 7px;
      }
      .van-button:before {
        border: 0;
      }
    }
    .allChecked-wrap {
      display: flex;
    }
  }
  .nullCart {
    width: 100%;
    height: 566px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: #959595;
    .iconfont {
      font-size: 80px;
      margin-bottom: 10px;
      margin-top: 120px;
    }
    .looking {
      padding: 7px 17px;
      border: 1px solid #959595;
      border-radius: 25px;
      margin-top: 30px;
      font-size: 16px;
    }
  }
  .select-input {
    position: relative;
    width: 20px;
    height: 20px;
    margin: 0 5px;
    input[type=checkbox]+label {
      display: inline-block;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      border: 1px solid #999;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    input[type=checkbox] {
      display: none;
    }
    /* 选中之后的样式*/
    input[type=checkbox]:checked+label::before {
      font-family: iconfont;
      content: "\e611";
      width: 21px;
      height: 21px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $color-theme;
      font-size: 22px;
      color: #ffffff;
      border: none;
      border-radius: 50%;
      position: absolute;
      top: -1.5px;
      left: -1.5px;
    }
  }
}
</style>
