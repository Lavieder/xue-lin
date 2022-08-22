<template>
  <van-card
    :price="item.goods.price.toFixed(2)"
    :title="item.goods.title"
    :desc="item.goods.description"
    :thumb="item.goods.cover_url"
    @click="onGoToDetail(item.goods_id)"
  >
    <template #bottom>
      <div class="order-num" v-if="way === 'order'">
        <i class="iconfont icon-chenghao"></i>
        <span>{{item.num}}</span>
      </div>
      <div v-else>
        <van-stepper v-model="num" v-if="type!=='collect'"
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
      </div>
    </template>
  </van-card>
</template>

<script>
import { computed } from '@vue/runtime-core'
import store from '@/store'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const num = computed({
      set: (value) => {
        emit('onComputedNum', value, props.item.id)
      },
      get: () => {
        return props.item.num
      }
    })
    const way = computed(() => {
      return store.state.contactAddress.way
    })
    const { emit } = context
    const onStepperClick = () => {
      emit('onStepperClick')
    }
    const onNumBlur = (id) => {
      emit('onNumBlur', id, event.target.value)
    }
    const onChangeNum = (value, item) => {
      emit('onChangeNum', value, item)
    }
    const onPlusNum = () => {
      emit('onPlusNum')
    }
    const onMinusNum = () => {
      emit('onMinusNum')
    }
    const onOverLimit = () => {
      emit('onOverLimit')
    }
    const onGoToDetail = (id) => {
      emit('onGoToDetail', id)
    }
    return {
      num,
      way,
      onStepperClick,
      onNumBlur,
      onChangeNum,
      onPlusNum,
      onMinusNum,
      onOverLimit,
      onGoToDetail
    }
  }

}
</script>

<style lang="scss" scoped>
.van-card {
  flex: 1;
  background: #ffffff;
  padding: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  :deep(.van-card__header ){
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
      align-items: center;
      .order-num {
        display: flex;
        align-items: center;
        font-size: 16px;
      }
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
</style>
