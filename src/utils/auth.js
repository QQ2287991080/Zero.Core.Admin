import cookie from 'js-cookie'

//token存放的key值
export const key = 'Admin'

//将token放入cookie
export const setToken = (token) => {
  //var key = userid + admin
  cookie.set(key, token, { expires: 0.8 })
}

//获取token
export const getToken = () => {
  //var key = userid + admin
  return cookie.get(key)
}

//移除token
export const removeToken = () => {
  // var key = userid + admin
  cookie.remove(key)
}
