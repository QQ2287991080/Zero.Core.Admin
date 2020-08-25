//#region Vue基础
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import route from 'vue-router'
import store from './store'
import './utils/permission'
//import './utils/global'
//#endregion

//#region  第三方插件

//UI 插件
import './icons/index'
import './styles/index.scss'
import './setup/ThirdUI'
//#endregion
//loading
// import loading from './utils/loading'
// Vue.prototype.$loading = loading

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
