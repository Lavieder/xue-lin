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
      title: '首页'
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: BookDetail,
    meta: {
      title: '书籍详情'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
