<template>
  <div class="edit-address">
    <van-nav-bar fixed :border="false" :title="title" placeholder>
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack" ></i>
      </template>
      <template #right v-if="title === '编辑收货地址'">
          <span @click="onDelete(editValue.id)">删除</span>
      </template>
    </van-nav-bar>
    <div class="edit-main">
      <van-address-edit
        :address-info="initAddress"
        :area-list="areaList"
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { reactive, toRefs } from '@vue/reactivity'
import { addAddress, removeAddress, updateAddress } from 'network/address'
import { onBeforeMount } from '@vue/runtime-core'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    editValue: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    const { emit } = context
    const onClickBack = () => {
      history.back()
    }
    const addressEdit = reactive({
      areaList: areaList,
      searchResult: [],
      initAddress: props.editValue
    })

    const resetContent = (content) => {
      const saveContent = {}
      saveContent.name = content.name
      saveContent.address = content.addressDetail
      saveContent.phone = content.tel
      saveContent.province = content.province
      saveContent.city = content.city
      saveContent.county = content.county
      if (content.isDefault) {
        saveContent.is_default = 1
      }
      return saveContent
    }
    const onSave = async (content) => {
      let res = ''
      console.log(resetContent(content))
      if (props.title === '编辑收货地址') {
        res = await updateAddress(props.editValue.id, resetContent(content))
      } else {
        res = await addAddress(resetContent(content))
      }
      if (res.status === 201 || res.status === 204) {
        emit('refreshAddress')
        onClickBack()
      }
    }
    const onDelete = async (id) => {
      const res = await removeAddress(id)
      if (res.status === 204) {
        emit('refreshAddress')
        onClickBack()
      }
    }
    // 获取地址的省市区编码
    const getAreaCode = () => {
      let areaCode = ''
      Object.entries(areaList.county_list).forEach(([code, county]) => {
        if (props.editValue.county === county) {
          // 找到所在省的编码
          const provinceCode = code.substr(0, 2)
          const pIndex = provinceCode + '0000'
          // 找到所在市的编码
          const cityCode = code.substr(2, 2)
          const cityIndex = provinceCode + cityCode + '00'
          // 找到所在区的编码
          const countyCode = provinceCode + cityCode + code.substr(4, 2)
          if (
            areaList.province_list[pIndex] === props.editValue.province &&
            areaList.city_list[cityIndex] === props.editValue.city
          ) {
            areaCode = countyCode
          }
        }
      })
      return areaCode
    }
    onBeforeMount(() => {
      addressEdit.initAddress.areaCode = getAreaCode()
    })
    return {
      onClickBack,
      onSave,
      onDelete,
      ...toRefs(addressEdit)
    }
  }

}
</script>

<style lang="scss" scoped>
.edit-address {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #f9f9f9;
  .edit-main {
    :deep(.van-form) {
      padding: 0;
      .van-address-edit__default,
      .van-address-edit__fields {
        border-radius: 0;
      }
      .van-address-edit__default {
        .van-switch--on {
          background: $color-dot;
        }
      }
      .van-address-edit__buttons {
        padding: 0;
        position: fixed;
        bottom: 12px;
        left: 0;
        z-index: 3;
        box-sizing: border-box;
        width: 100%;
        .van-address-edit__button {
          margin: 5px auto;
          background: $color-theme;
          border: none;
          width: 75%;
          height: 40px;
        }
      }
    }
  }
}
</style>
