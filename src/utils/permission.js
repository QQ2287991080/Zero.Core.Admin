import router from '../router'
import { getToken } from './auth'
//import Layout from '@/views/layout'

//用户token凭证
var token = getToken()
router.beforeEach((to, from, next) => {
  //如果token存在
  if (token) {
    //如果想要手动跳转到登录，不允许重定向到首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      //获取注册的路由
      var routers = router.routes
      console.log(routers)
      router.addRoutes(routers)
      next({ ...to, replace: true })
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
