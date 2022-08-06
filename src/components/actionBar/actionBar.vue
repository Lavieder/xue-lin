<template>
  <van-action-bar>
    <van-action-bar-icon icon="cart-o" text="购物车" />
    <van-action-bar-icon icon="shop-o" text="收藏" />
    <van-action-bar-button type="warning" text="加入购物车" />
    <van-action-bar-button type="danger" text="立即购买" />
  </van-action-bar>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.van-action-bar {
  width: 375px;
  height: 55px;
}
</style>
