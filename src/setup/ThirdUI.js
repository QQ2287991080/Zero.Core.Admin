import Vue from 'vue'
//elementUI
import ElementUI from 'element-ui'
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//设置element ui大小
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Loading)
export default Vue
