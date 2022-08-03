import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('views/Home.vue')
const Category = () => import('views/Category.vue')
const Cart = () => import('views/Cart.vue')
const User = () => import('views/User.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
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
