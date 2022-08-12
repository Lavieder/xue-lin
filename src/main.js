import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Tabbar, TabbarItem, NavBar, List, Loading,
  Lazyload, Tab, Tabs, Card, Stepper, SubmitBar,
  ActionBar, ActionBarIcon, ActionBarButton,
  Form, Field, CellGroup, Badge, SwipeCell,
  Tag
} from 'vant'

// 引入iconfont样式
import 'assets/font/iconfont.css'
import 'assets/css/base.scss'
import 'amfe-flexible'
import 'assets/css/toast.scss'

createApp(App).use(store).use(router).use(Lazyload, {
  lazyComponent: true
}).use(
  Tabbar, TabbarItem, NavBar, List, Loading,
  Tab, Tabs, Card, Stepper, SubmitBar,
  ActionBar, ActionBarIcon, ActionBarButton,
  Form, Field, CellGroup, Badge, SwipeCell,
  Tag
).mount('#app')
