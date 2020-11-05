//#region Vue基础
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import route from 'vue-router'
import store from './store'
//import './utils/permission'
//import './utils/global'
//#endregion

//#region  第三方插件

//UI 插件
import './icons/index'
import './setup/ThirdUI'
import '@/styles/index.scss'
//#endregion
//import test from './test'
import './utils/roleAuth'
//#region  解决 Avoided redundant navigation to current location 错误
Vue.config.productionTip = false
const originalPush = route.prototype.push
route.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

//#endregion
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
