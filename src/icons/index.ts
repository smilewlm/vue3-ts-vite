import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

// 使用require.context(webpack的方法，下面改成vite的方法) 加载./svg目录下所有svg文件
const files = import.meta.globEager<any>("./svg/*.svg")

export default (app: App) => {
  // 全局注册svg-icon组件
  app.component('svg-icon', SvgIcon)
}
