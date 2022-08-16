<template>
  <div class="address">
    <van-nav-bar fixed :border="false" title="管理地址" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
    </van-nav-bar>
    <div class="address-mian">
      <van-address-list
        v-model="chosenAddressId"
        :switchable="false"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      >
      </van-address-list>
    </div>
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
import { computed, onBeforeMount } from '@vue/runtime-core'
import { getAddressData } from 'network/address'
export default {
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
      chosenAddressId: '1',
      list: [],
      addressDetail: {}
    })
    // 获取地址列表
    const getAddressList = async () => {
      const res = await getAddressData()
      if (res.status === 200) {
        addressList.list = res.data.data.map(item => {
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            province: item.province,
            city: item.city,
            county: item.county,
            address: `${item.province}${item.city}${item.county}${item.address}`,
            addressDetail: item.address,
            isDefault: !!item.is_default
          }
        })
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
    const onEdit = (item, index) => {
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
      onAdd,
      onEdit,
      transitionName,
      title,
      getAddressList
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
    :deep(.van-address-list) {
      padding: 0;
      .van-address-item {
        margin: 0;
        border-radius: 0;
        position: relative;
        height: 85px;
        display: flex;
        align-items: center;
        .van-address-item__name {
          flex-direction: row-reverse;
          justify-content: flex-end;
          margin-bottom: 3px;
          .van-address-item__tag {
            margin-left: 0;
            margin-right: 10px;
            background: $color-dot;
            border-radius: 2px;
          }
        }
        .van-address-item__edit {
          right: 0;
        }
      }
      .van-address-item:not(:last-child)::after {
        content: "";
        display: inline-block;
        border-bottom: 1px solid #e7e7e7;
        transform: scaleY(.5);
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
      }
    }
    :deep(.van-address-list__bottom) {
      z-index: 2;
      bottom: 12px;
      .van-address-list__add {
        margin: 5px auto;
        background: $color-theme;
        border:none;
        width: 75%;
        height: 40px;
      }
    }
  }
}
</style>
