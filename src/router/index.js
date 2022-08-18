import store from '@/store'
import { Toast } from 'vant'
import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('views/Home.vue')
const Category = () => import('views/Category.vue')
const Cart = () => import('views/Cart.vue')
const User = () => import('views/User.vue')
const UserCenter = () => import('views/UserCenter.vue')
const Setting = () => import('views/Setting.vue')
const BookDetail = () => import('views/BookDetail.vue')
const Register = () => import('views/Register.vue')
const Login = () => import('views/Login.vue')
const Blank = () => import('views/Blank.vue')
const ForgotPassword = () => import('views/ForgotPassword.vue')
const editUser = () => import('components/user/editUser.vue')
const Address = () => import('views/Address.vue')
const editAddress = () => import('components/address/editAddress.vue')
const FillInOrder = () => import('views/Order/FillInOrder.vue')
const SubmitOrder = () => import('views/Order/SubmitOrder.vue')

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
      title: '购物车',
      isAuthRequired: true
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
    path: '/usercenter',
    name: 'usercenter',
    component: UserCenter,
    meta: {
      index: 9,
      title: '用户中心',
      isAuthRequired: true
    },
    children: [
      {
        path: 'edit',
        name: 'edituser',
        component: editUser,
        meta: {
          index: 10,
          title: '修改信息',
          isAuthRequired: true
        }
      }
    ]
  },
  {
    path: '/address',
    name: 'address',
    component: Address,
    meta: {
      index: 9,
      title: '管理地址',
      isAuthRequired: true
    },
    children: [
      {
        path: 'edit',
        name: 'editAddress',
        component: editAddress,
        meta: {
          index: 10,
          title: '编辑收货地址',
          isAuthRequired: true
        }
      }
    ]
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: BookDetail,
    meta: {
      index: 5,
      title: '书籍详情'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      index: 6,
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      index: 7,
      title: '注册'
    }
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: ForgotPassword,
    meta: {
      index: 7,
      title: '忘记密码'
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: {
      index: 6,
      title: '个人设置'
    }
  },
  {
    path: '/fillorder',
    name: 'fillorder',
    component: FillInOrder,
    meta: {
      index: 6,
      title: '填写订单'
    }
  },
  {
    path: '/suborder',
    name: 'suborder',
    component: SubmitOrder,
    meta: {
      index: 7,
      title: '提交订单'
    }
  },
  {
    path: '/blank',
    name: 'blank',
    component: Blank,
    meta: {
      index: 9
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // 检查是否登录授权
  if (to.meta.isAuthRequired && store.state.isLogin === false) {
    Toast.fail({
      message: '您还没有登录，请先登录',
      duration: 1000
    })
    router.push({
      path: '/user'
    })
  }
  // 监听路由，切换过渡动画
  const toIdx = to.meta.index
  const fromIdx = from.meta.index
  if (from === undefined) {
    to.meta.transitionName = 'fade'
  } else if (toIdx === 5 || toIdx === 6 || toIdx === 7 || toIdx === 8 || toIdx === 9 || toIdx === 10) {
    if (toIdx + 1 === fromIdx || toIdx + 3 === fromIdx) {
      to.meta.transitionName = 'slide-right'
    } else {
      to.meta.transitionName = 'slide-left'
    }
  } else if (fromIdx === 5 || fromIdx === 6 || fromIdx === 9) {
    to.meta.transitionName = 'slide-right'
  } else {
    to.meta.transitionName = 'fade'
  }
  next()
  document.title = to.meta.title
})

export default router
