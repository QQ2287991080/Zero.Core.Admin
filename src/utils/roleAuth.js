import Vue from 'vue'
import store from '../store'

//注册指令
Vue.directive('auth', {
  inserted: function(el, binding) {
    if (!store.getters.isSuperAdmin) {
      //判断权限编码是否存在
      var data = [''] //dic_addchild
      var index = store.getters.permission.indexOf(binding.value)
      //var index = data.indexOf(binding.value)
      if (index < 0) {
        //不存在隐藏
        el.parentNode.removeChild(el)
      }
    } else {
      return true
    }
  },
})
