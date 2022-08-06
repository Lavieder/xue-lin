import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Tabbar, TabbarItem, NavBar, List,
  Lazyload, Tab, Tabs, Card, Stepper, SubmitBar,
  ActionBar, ActionBarIcon, ActionBarButton,
  ImagePreview
} from 'vant'

// 引入iconfont样式
import 'assets/font/iconfont.css'
import 'assets/css/base.scss'
import 'amfe-flexible'

createApp(App).use(store).use(router).use(Lazyload, {
  lazyComponent: true
}).use(
  Tabbar, TabbarItem, NavBar, List,
  Tab, Tabs, Card, Stepper, SubmitBar,
  ActionBar, ActionBarIcon, ActionBarButton,
  ImagePreview
).mount('#app')
