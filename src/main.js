import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*const modulesFiles = require.context('@/modules',true,/\.js$/)
const modules = modulesFiles.keys().reduce((modules,path)=>{
  const name= path.replace(/^\.\/(.*)\.\w+$/,'$1')
  const value= import(path)
  return modules
},{}) */
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import './styles/element-variables.scss'
import './styles/nprogress.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser,faUserSecret, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueSvgIcon } from '@yzfe/vue-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import 'windi.css'

import './permission.js'
console.log(faUser)
library.add(faUser)
library.add(faUserSecret)
library.add(faUserCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale, // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    ...zhLocale, // 或者用 Object.assign({ message: '你好' }, zhLocale)
  },
}
// Create VueI18n instance with options
Vue.component('svg-icon', VueSvgIcon)

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages, 属性名一定要是messages
})
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'small',
  zIndex: 3000,
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
