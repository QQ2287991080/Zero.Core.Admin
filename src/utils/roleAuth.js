import store from '../store'

//验证按钮或者模块是不是允许显示
export const allow = (code) => {
  var index = store.getters.permission.indexOf(code)
  return index > 0
}
