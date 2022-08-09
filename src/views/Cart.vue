<template>
  <div class="cart">
    <van-nav-bar title="购物车" right-text="编辑" fixed ref="navbar" :border="false" :placeholder="true" />
    <div class="cart-wrap">
      <div class="cart-item" v-for="(item, index) in data" :key="index">
        <div class="select-input" >
          <input type="checkbox"
            :id="'ck'+index"
            :checked="isChecked"
            @click.stop="onOnlySelect($event,item.id)"
          />
          <label :for="'ck'+index"></label>
        </div>
        <van-card
          :price="item.goods.price.toFixed(2)"
          :title="item.goods.title"
          :desc="item.goods.descrition"
          :thumb="item.goods.cover_url"
        >
        <template #bottom>
          <van-stepper v-model="item.num" integer min="1" max="8" />
        </template>
        </van-card>
      </div>
    </div>
    <van-submit-bar :price="35175" button-text="结算(x)" @submit="onSubmit($event)">
      <div class="allChecked-wrap" @click.prevent="onAllSelect" >
        <div class="select-input" >
          <input type="checkbox" v-model="allChecked" id="allChecked" />
          <label for="allChecked"></label>
        </div>
        <label for="allChecked">全选</label>
      </div>
    </van-submit-bar>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getCurrentInstance, onActivated, onBeforeMount, onMounted } from '@vue/runtime-core'
import { allChecked, isChecked, onOriginGoods, onAllSelect, onOnlySelect } from 'mixins/cart'
import { offsetTop, getNode, getNavHeight } from 'mixins/navHeight'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: {
  },
  setup () {
    const navNode = getCurrentInstance()
    getNode(navNode)
    const store = useStore()
    const route = useRoute()
    const setCurrentPath = () => {
      // console.log(route.name)
      store.commit('SET_CURRENT_PATH', route.name)
    }
    const data = ref([
      {
        id: 2,
        user_id: 1,
        goods_id: 4,
        num: 1,
        is_checked: 1,
        goods: {
          goods_id: 4,
          title: '胭脂用尽时，桃花已盛开',
          price: 132,
          cover_url: 'https://oss.shop.eduwork.cn/product/2020-0820-5f3e16c2aba88.png',
          descrition: '[日]传到叶子'
        }
      },
      {
        id: 9,
        user_id: 1,
        goods_id: 7,
        num: 3,
        is_checked: 0,
        goods: {
          goods_id: 7,
          title: '剧本结构论',
          price: 233,
          cover_url: 'https://oss.shop.eduwork.cn/react/1658843365778.jpg',
          descrition: '[日]空你几哇'
        }
      }
    ])
    // 处理data数据，把所有购物车商品id和选中id分别生成一个数组，以便选中判断
    const cartIDList = () => {
      return data.value.map(item => {
        return item.id
      })
    }
    const checkedList = () => {
      return data.value.filter(item => {
        return item.is_checked
      }).map(item => {
        return item.id
      })
    }
    // console.log(cartIDList(), checkedList())
    onOriginGoods(cartIDList(), checkedList())
    // 购物车 根据选中数量计算价格
    // 提交订单
    const onSubmit = (e) => {
      console.log(e)
    }
    onBeforeMount(() => {
      setCurrentPath()
    })
    onActivated(() => {
      setCurrentPath()
    })
    onMounted(() => {
      getNavHeight()
    })
    return {
      data,
      offsetTop,
      allChecked,
      isChecked,
      onAllSelect,
      onOnlySelect,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart::v-deep {
    background: #ffffff;
    .cart-wrap {
      padding: 0 15px;
      .cart-item:last-of-type {
        border: none;
      }
      .cart-item {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #e7e7e7;
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
                font-size: $font-size-medium;
                font-weight: 600;
              }
              .van-card__desc {
                flex: none;
                font-size: $font-size-small;
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
      }
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
          border-radius: 5px;
        }
      }
      .allChecked-wrap {
        display: flex;
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
