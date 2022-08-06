import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('views/Home.vue')
const Category = () => import('views/Category.vue')
const Cart = () => import('views/Cart.vue')
const User = () => import('views/User.vue')
const BookDetail = () => import('views/BookDetail.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [],
    meta: {
      index: 1,
      title: '首页'
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      index: 2,
      title: '分类'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      index: 3,
      title: '购物车'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      index: 4,
      title: '我的'
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: BookDetail,
    meta: {
      index: 5,
      title: '书籍详情'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  document.title = to.meta.title
  next()
})

export default router
