import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入iconfont样式
import 'assets/font/iconfont.css'
import 'assets/css/base.scss'
import 'amfe-flexible'

createApp(App).use(store).use(router).mount('#app')
