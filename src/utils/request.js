import router from '../router'
import axios from 'axios'
import { Message } from 'element-ui'
import { showLoading, hiddenLoading } from '../utils/loading'
import { getToken } from './auth'
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
    showLoading()
    var token = getToken()
    if (token !== null) {
      config.headers.Authorization = `Bearer '${token}`
    }
    return config
  },
  (err) => {
    hiddenLoading()
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
        Tips('未授权,请登录！', 'warn')
        login()
        break
      case 400:
        //返回错误信息
        Tips(response.data.msg, 'error')
        console.log(response.data.msg)
        break
      default:
        Tips(response.data.msg, 'success')
        break
    }
    hiddenLoading()
    return Promise.resolve(response)
  },
  (error) => {
    //console.log(err)
    //处理请求超时
    var errConfig = error.config
    if (
      error.statusCode == 'ECONNABORTED' &&
      error.msg.indexOf('timeout') != -1 &&
      !errConfig._retry
    ) {
      //console.log('请求超时')
      errConfig._retry = true
      // return error
    }
    hiddenLoading()
    return Promise.reject(error)
  }
)
//#endregion
export default instance
