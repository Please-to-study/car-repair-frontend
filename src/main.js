import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import 'element-plus/dist/index.css'
import './style/element_visiable.scss'
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import './index.css'

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app')

export default app
