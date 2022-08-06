<template>
  <div class="book-detail">
    <van-nav-bar fixed :border="false" >
      <template #left>
          <i class="iconfont icon-left" @click.stop="onClickBack"></i>
        </template>
      <template #right>
          <i class="iconfont icon-share" @click.stop="onClickShare"></i>
          <i class="iconfont icon-gengduo" @click.stop="onClickMore"></i>
        </template>
    </van-nav-bar>
    <div class="detail-content">
      <div class="images">
        <img :src="goods.cover_url" :alt="goods.title" />
      </div>
      <div class="text-desc">
        <div class="summary">
          <div class="title-price">
            <p class="title">{{goods.title}}</p>
            <div class="price">
              ￥<span>{{goods.price}}</span>
              <span class="stock">库存{{goods.stock}}</span>
            </div>
          </div>
          <div class="desc">
            <van-list>
              <div class="cell" v-for="(item,index) in types" :key="index">
                <div class="cell-type">{{item.name}}</div>
                <van-cell :title="item.value" />
              </div>
            </van-list>
          </div>
        </div>
        <div class="comments">
          <div class="sub-title">
            <span>评价</span>
            <span class="num-icon">
              <span class="num-com">共{{goods.comments?goods.comments.length:0}}条评价</span>
              <i class="iconfont icon-xiangyou"></i>
            </span>
          </div>
          <div class="info-content">暂时还没有评论哦，快来评论吧</div>
        </div>
        <div class="detail">
          <div class="sub-title detail-like">
            <span class="robe"></span>
            <span class="cont">详情</span>
          </div>
          <div class="detail-main" v-html="goods.details"></div>
        </div>
        <div class="like-goods">
          <div class="sub-title detail-like">
            <span class="robe"></span>
            <span class="cont">猜你喜欢</span>
          </div>
          <div class="rec-content">
            <lazy-component class="lazy-book" v-for="(recbook, index) in like_goods" :key="index">
              <book-item :book-item="recbook"></book-item>
            </lazy-component>
          </div>
        </div>
      </div>
    </div>
    <div class="place"></div>
    <action-bar></action-bar>
  </div>
</template>

+
<script>
import { onBeforeMount, onMounted, onActivated, ref, reactive, toRefs } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ActionBar from '@/components/actionBar/actionBar.vue'
import { getDetailData } from 'network/detail'
// import BookItem from '@/components/bookItem/bookItem.vue'
// import { offsetTop, getNode, getNavHeight } from 'mixins/navHeight'
export default {
  components: { ActionBar },
  name: 'Detail',
  setup () {
    // const navNode = getCurrentInstance()
    // getNode(navNode)
    const store = useStore()
    const route = useRoute()
    const setCurrentPath = () => {
      store.commit('SET_CURRENT_PATH', route.name)
    }
    const bookId = ref(0)
    const book = reactive({
      goods: {},
      like_goods: [],
      types: []
    })
    const types = [
      { name: '图书编号', value: '9878354627735' },
      { name: '出版社', value: '人民教育出版社' },
      { name: '装帧', value: '精装' },
      { name: '运费', value: '包邮' }
    ]
    const getBooKDetail = async () => {
      bookId.value = route.params.id
      const res = await getDetailData(route.params.id)
      if (res.status === 200) {
        book.goods = priceToFixed(res.data.goods)
        book.like_goods = res.data.like_goods
        book.types = types
        book.types.splice(book.types.length - 1, 0, { name: '分类', value: book.goods.category_id })
      }
      console.log(book)
    }
    const priceToFixed = (book) => {
      book.price = book.price.toFixed(2)
      return book
    }
    const onClickBack = () => history.back()
    const onClickShare = () => {
      console.log('分享')
    }
    const onClickMore = () => {
      console.log('更多')
    }
    onBeforeMount(() => {
      setCurrentPath()
    })
    // 只有activated 生命周期在组件使用keep-alive缓存后也能执行相应操作
    onActivated(() => {
      setCurrentPath()
    })
    onMounted(() => {
      // getNavHeight()
      getBooKDetail()
    })
    return {
      bookId,
      ...toRefs(book),
      onClickBack,
      onClickShare,
      onClickMore
    }
  }
}
</script>

<style lang="scss" scoped>

.book-detail::v-deep {
  background: #e6e6e6;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  overflow-y: scroll;
  overflow-x: hidden;
  // margin-bottom: 60px;
  .van-nav-bar {
    padding: 0 12px;
    background: transparent;
    .van-nav-bar__content {
      .van-nav-bar__left,
      .van-nav-bar__right {
        padding: 0;
      }
      .van-haptics-feedback:active {
        opacity: initial;
      }
    }
    i.iconfont {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      font-size: 19px;
      color: #ffffff;
    }
    .icon-share {
      margin-right: 15px;
    }
  }
  .detail-content {
    // height: 400px;
    .images {
      width: 100%;
      height: 300px;
      background: #ffffff;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .text-desc {
      .summary {
        padding: 15px 12px;
        background: #ffffff;
        .title-price {
          display: flex;
          flex-direction: column;
          .title {
            font-size: $font-size-large;
            font-weight: 800;
          }
          .price {
            margin: 15px 0;
            font-size: $font-size-medium;
            color: #caaa6a;
            font-weight: 600;
            span {
              font-size: 30px;
              font-weight: 400;
            }
            .stock {
              display: inline-block;
              font-size: $font-size-small-s;
              color: pink;
              border: 1px solid red;
              padding: 2px 7px;
              border-radius: 8px;
              margin-left: 15px;
            }
          }
        }
        .desc {
          font-size: 16px;
          .cell {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 11px 0;
            .cell-type {
              width: 85px;
              color: #7a7a7a;
              font-size: 14px;
            }
            .van-cell {
              padding: 0;
              color: #000000;
              font-weight: 600;
            }
          }
          .cell:last-of-type {
            color: $color-theme;
            font-weight: $font-weight;
          }
        }
      }
      .like-rec,
      .comments {
        padding: 15px 12px;
        background: #ffffff;
        margin: 10px 0;
        .info-content {
          margin-top: 12px;
          font-size: $font-size-medium;
          line-height: 25px;
        }
        .sub-title {
          font-size: $font-size-medium-x;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .num-icon {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: $color-theme;
            .num-com {
              font-size: $font-size-small-s;
            }
          }
        }
      }
      .detail {
        background: #ffffff;
        .detail-main {
          padding: 0 12px 15px 12px;
        }
        .book-detail-item {
          margin: 0!important;
          padding: 0!important;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .like-goods {
        background: #ffffff;
        margin-top: 10px;
        .rec-content {
          padding: 0 12px 15px;
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          .lazy-book {
            margin-top: 10px;
            width: 48%;
          }
        }
      }
    }
    .detail-like {
      padding-top: 15px;
      .robe {
        border: 3px solid $color-theme;
        background: $color-theme;
        margin-right: 15px;
        height: 25px;
        padding: 5px 0;
      }
    }
  }
  .place {
    width: 100%;
    height: 60px;
    background: #ffffff;
  }
}
</style>
