<template>
    <div class="address-cell">
      <div class="wrap">
        <template v-if="address.id">
          <div class="tag-county">
            <span class="tag" v-if="address.is_default">默认</span>
            <span class="county">{{address.province+address.city+address.county}}</span>
          </div>
          <div class="detail-address">{{address.address}}</div>
          <div class="contact-person">
            <span class="name">{{address.name}}</span>
            <span class="tel">{{tel}}</span>
          </div>
        </template>
        <template v-else>
          <div class="detail-address" @click="onAddAddress">添加收货地址</div>
        </template>
      </div>
      <i :class="`iconfont ${type==='order'?'icon-xiangyou':'icon-bianji'}`" @click.stop="onEdit"></i>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  props: {
    address: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const tel = computed(() => {
      if (!props.address.id) return
      return props.address.phone.replace(props.address.phone.substr(3, 4), '****')
    })
    const { emit } = context
    const onEdit = () => {
      if (props.type === 'address') {
        emit('onEdit', props.address)
      }
    }
    const onAddAddress = () => {
      emit('onAddAddress')
    }
    return {
      onEdit,
      tel,
      onAddAddress
    }
  }

}
</script>

<style lang="scss" scoped>
.address-cell {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  .wrap {
    font-size: 12px;
    .tag-county {
      display: flex;
      align-items: center;
      .tag {
        margin-right: 5px;
        font-size: 12px;
        transform: scale(0.85);
        background: $color-dot;
        padding: 0 3px;
        color: #ffffff;
        border-radius: 2px;
        text-align: center;
      }
      .county {
        color: #313131;
      }
    }
    .detail-address {
      margin: 5px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .contact-person {
      display: flex;
      align-items: flex-end;
      color: #313131;
      .name {
        margin-right: 7px;
      }
    }
  }
  .iconfont {
    color: #636363;
    font-size: 18px;
  }
  .icon-xiangyou {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
