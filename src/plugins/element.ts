import { App } from 'vue'
import { ElButton, ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

export type Size = 'default' | 'medium' | 'small' | 'mini'

export default (app: App): void => {
  app.use(ElementPlus, {
    locale: zhCn
  })
  const components = [
    ElButton,
    ElMessage,
    ElNotification,
    ElMessageBox
  ]
  components.forEach(component => {
    app.component(component.name, component)
  })

  // Vue.prototype 替换为 config.globalProperties
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt

  // element-plus全局配置 
  app.config.globalProperties.$ELEMENT = {
    size: 'medium',
    // zIndex: 2000 弹框zIndex默认值：2000
  }
}