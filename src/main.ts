import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './route/index'
import store from './store/index'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'

const app = createApp(App)

app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
