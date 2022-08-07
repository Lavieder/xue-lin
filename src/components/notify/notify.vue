<template>
  <div class="notify">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.notify::v-deep {
  position: absolute;
  left: 50%;
  top: 50%;
  background: rgb(0,0,0,0.7);
  color: #ffffff;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate3d(-50%, -50%, 0);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 25px;
  transition: all 2s;
  .van-icon {
    font-size: 40px;
  }
}
</style>
