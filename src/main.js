import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './sotrt'
// 加载全局样式文件
import './styles/index.less'
// 引入element框架
import ElementUI from 'element-ui'
import { ElementTiptapPlugin } from 'element-tiptap'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-tiptap/lib/index.css'
// 全局注册element组件库
Vue.use(ElementUI)
Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
