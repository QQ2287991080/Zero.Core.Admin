import router from '../router'
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from './auth'
//element alert 窗口
const Tips = (msg, type) => {
  Message({
    message: msg, //消息
    type: type, //类型
    duration: 1 * 1000, //显示时长
  })
}
//跳转登录页
const login = () => {
  removeToken()
  router.push('/')
}

//创建axios实例
var instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30 * 1000,
})
//#region  请求拦截器
instance.interceptors.request.use(
  (config) => {
    var token = getToken()
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    console.log('axios error in request')
    return Promise.reject(err)
  }
)
//#endregion

//#region  响应配置
instance.interceptors.response.use(
  (response) => {
    //响应代码
    var code = response.data.statusCode
    switch (code) {
      case 401:
        //未授权跳转登录页
        Tips('未授权,请登录！', 'error')
        console.log('redirect login')
        removeToken()
        login()
        return Promise.reject(response)
      case 400:
        //返回错误信息
        Tips(response.data.msg, 'error')
        console.log(response.data.msg)
        break
      default:
        Tips(response.data.msg, 'success')
        break
    }
    return Promise.resolve(response)
  },
  (error) => {
    // 超时请求处理
    var originalRequest = error.config
    if (
      error.code == 'ECONNABORTED' &&
      error.message.indexOf('timeout') != -1 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      return null
    }
    //处理错误
    const data = error.response
    console.log(data)
    //授权失败
    if (data.status === 401) {
      Tips('身份信息过期，请重新登录。', 'error')
      login()
    }
    console.log('错误信息')
    return Promise.reject(error)
  }
)

//#endregion
export default instance
