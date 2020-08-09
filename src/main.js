//#region Vue基础
import Vue from 'vue'
import App from './App.vue'
import router from './router'
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
Vue.config.productionTip = false

// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err)
// }
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
