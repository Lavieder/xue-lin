<template>
  <div class="book-detail" @scroll="onScroll">
    <van-loading color="#000000" v-if="loading"/>
    <div class="book-detail-main">
      <van-nav-bar fixed :border="false" ref="navbar">
        <template #left>
            <i :class="`iconfont icon-left ${iconact?'iconact':''}`" @click.stop="onClickBack" ></i>
        </template>
        <template #title>
            <span ref="navtitle">书籍详情</span>
        </template>
        <template #right>
          <i :class="`iconfont icon-share ${iconact?'iconact':''}`" @click.stop="onClickShare"></i>
          <i :class="`iconfont icon-gengduo ${iconact?'iconact':''}`" @click.stop="onClickMore"></i>
        </template>
      </van-nav-bar>
      <div class="detail-content">
        <div class="images" ref="images">
          <img :src="goods.cover_url" :alt="goods.title" />
        </div>
        <div class="text-desc">
          <div class="summary">
            <div class="title-price">
              <p class="title">{{goods.title}}</p>
              <div class="price">
                ￥
                <span class="price-stock">
                  <span>{{goods.price}}</span>
                  <span class="stock">库存{{goods.stock}} </span>
                </span>
              </div>
            </div>
            <div class="desc">
              <van-list>
                <div class="cell" v-for="(item,index) in types" :key="index">
                  <div class="cell-type">{{item.name}}</div>
                  <van-cell :title="item.value" />
                  <i class="iconfont icon-xiangyou"></i>
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
                <book-item :book-item="recbook" @onGoToDetail="onGoToDetail"></book-item>
              </lazy-component>
            </div>
          </div>
        </div>
      </div>
      <div class="place"></div>
      <action-bar
        @onGoToChildCart="onGoToChildCart"
        @onCollectBook="onCollectBook"
        @onAddCart="onAddCart"
        @onBuyNow="onBuyNow"
        :cartTotal="cartTotal"
      ></action-bar>
    </div>
  </div>
</template>

<script>
import { onMounted, onActivated, ref, reactive, toRefs, watch, computed } from '@vue/runtime-core'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import ActionBar from '@/components/actionBar/actionBar.vue'
import { getDetailData } from 'network/detail'
import { addCartGoods } from 'network/cart'
import { Toast } from 'vant'
import store from '@/store'

export default {
  components: { ActionBar },
  name: 'Detail',
  setup () {
    const route = useRoute()
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
    // 获取图书详情信息
    const getBooKDetail = async () => {
      bookId.value = route.params.id
      const res = await getDetailData(route.params.id)
      if (res.status === 200) {
        book.goods = priceToFixed(res.data.goods)
        book.like_goods = res.data.like_goods
        book.types = types
        book.types.splice(book.types.length - 1, 0, { name: '分类', value: book.goods.category_id })
      }
    }
    // 处理图书价格保留2位小数
    const priceToFixed = (book) => {
      book.price = book.price.toFixed(2)
      return book
    }
    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.id !== from.params.id) {
        console.log('update', to)
      }
    })
    const router = useRouter()
    const onGoToDetail = (id) => {
      // console.log(id)
      router.push({
        name: 'blank',
        params: { id: id }
      })
    }
    // 监听loading
    const loading = ref(true)
    watch(() => book.goods.id, (n, o) => {
      if (n) {
        loading.value = false
      } else {
        loading.value = true
      }
    })
    // 获取tab导航栏滚动百分比
    const images = ref(null)
    const navbar = ref(null)
    const navtitle = ref(null)
    const iconact = ref(false)
    const onScroll = (e) => {
      // console.log(navbar)
      const scrollTop = e.target.scrollTop
      const imageNode = images.value
      const navbarNode = navbar.value.$el
      const navTitleNode = navtitle.value
      const imageHeight = imageNode.offsetHeight
      const navbarHeight = navbarNode.offsetHeight
      // 导航栏透明度
      const percent = scrollTop / (imageHeight - navbarHeight)
      navbarNode.style.background = `rgba(255,255,255,${percent})`
      navbarNode.style.borderBottom = `1px solid rgba(223,223,223,${percent})`
      navTitleNode.parentElement.style.color = `rgba(0,0,0,${percent})`
      if (percent > 0.15) {
        iconact.value = true
      } else {
        iconact.value = false
      }
    }
    // 返回按钮
    const onClickBack = () => {
      history.go(-1)
      store.commit('SET_BACK_STATU', true)
    }
    // 分享按钮
    const onClickShare = () => {
      console.log('分享')
    }
    // 更多按钮
    const onClickMore = () => {
      console.log('更多')
    }
    // 从详情页去购物车
    const onGoToChildCart = () => {
      console.log('从详情页去购物车')
    }
    // 收藏图书商品
    const onCollectBook = () => {
      console.log('收藏')
    }
    // 获取购物车徽标数量
    const cartTotal = computed(() => {
      return store.state.cartTotal
    })
    // 加入购物车
    let addCartReady = false
    const onAddCart = async () => {
      if (addCartReady) {
        return
      }
      addCartReady = true
      const data = { goods_id: book.goods.id, num: 1 }
      const res = await addCartGoods(data)
      if (res.status === 201 || res.status === 204) {
        Toast.success('加入购物车成功')
        store.commit('SET_CART_TOTAL', cartTotal.value + 1)
        setTimeout(() => {
          addCartReady = false
        }, 3000)
      } else {
        console.log('422 addCartGoods参数异常')
      }
    }
    // 立即购买
    const onBuyNow = () => {
      console.log('立即购买')
    }
    // 只有activated 生命周期在组件使用keep-alive缓存后也能执行相应操作
    onActivated(() => {
    })
    onMounted(() => {
      // getNavHeight()
      getBooKDetail()
      store.commit('SET_BACK_STATU', false)
    })
    return {
      bookId,
      loading,
      iconact,
      ...toRefs(book),
      onClickBack,
      onClickShare,
      onClickMore,
      onScroll,
      onGoToDetail,
      navbar,
      images,
      navtitle,
      onGoToChildCart,
      onCollectBook,
      onAddCart,
      onBuyNow,
      cartTotal

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
  z-index:4;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge
  overflow: -moz-scrollbars-none;
  .van-nav-bar {
    padding: 0 12px;
    background: transparent;
    .van-nav-bar__content {
      .van-nav-bar__title {
        color: transparent;
      }
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
      transition: all 0.35s;
    }
    i.iconfont.iconact {
      background: rgba(0, 0, 0, 0);
      color: #000000;
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
            display: flex;
            align-items: baseline;
            span {
              font-size: 30px;
              font-weight: 400;
            }
            .price-stock {
              display: flex;
              align-items: flex-start;
            }
            .stock {
              display: inline-block;
              font-size: $font-size-small-s;
              color: $color-dot;
              border: 1px solid $color-dot;
              padding: 2px 6px;
              border-radius: 5px;
              margin-left: 15px;
              zoom: 0.77;
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
            .van-cell:after {
              border: 0;
            }
            .iconfont {
              font-size: 12px;
              color: #000000;
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
      padding: 15px 0;
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
.book-detail::-webkit-scrollbar {
  display: none;
  width: 0!important;
}
.van-loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
}
</style>
