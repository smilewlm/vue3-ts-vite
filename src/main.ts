import { createApp } from 'vue'
import router from './route/index'
import store from './store/index'
import App from './App.vue'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import initSvgIcon from '@/icons/index'
import installElementPlus, { Size } from './plugins/element'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'

const app = createApp(App)

app.use(store)
app.use(installElementPlus)
app.use(router)
app.use(initSvgIcon)
app.mount('#app')


// vue实例上挂载属性类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
    $ELEMENT: {
      size: Size
    }
  }
}