import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/request'
import api from './api'

const app = createApp(App)
app.config.globalProperties.$request =request
app.config.globalProperties.$api = api
app.use(router).use(ElementPlus).mount('#app')
