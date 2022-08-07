<template>
  <div class="book-item" @click="onGoToDetail(bookItem.id)">
    <div class="book-img">
      <img v-lazy="bookItem.cover_url" />
    </div>
    <p class="book-name">{{bookItem.title}}</p>
    <p class="description">{{bookItem.description}}</p>
    <div class="price-icon">
      <span class="price">￥{{bookItem.price.toFixed(2)}}</span>
      <i class="iconfont icon-shinshopgouwuche"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bookItem',
  props: {
    bookItem: {
      type: Object,
      default: () => {}
    }
  },
  emit: ['onGoToDetail'],
  setup (props, context) {
    const { emit } = context
    const onGoToDetail = (id) => {
      emit('onGoToDetail', id)
    }
    return {
      onGoToDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.book-item{
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px -1px 10px #e2e2e2;
  .book-img {
    width:100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .book-name {
    font-size: $font-size-medium;
    font-weight: 600;
    margin-top: 5px;
  }
  .description {
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
  .price-icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      font-size: $font-size-medium-x;
      color: $color-theme;
      font-weight: 600;
    }
    .iconfont {
      font-size: $font-size-large-x;
    }
  }
}
</style>
