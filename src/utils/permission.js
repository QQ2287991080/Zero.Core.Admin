import router from '../router'
import store from '../store'
import { getToken } from './auth'
//import Layout from '@/views/layout'

//用户token凭证
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  //console.log('begin  beforeEach  in  router')
  const hasToken = getToken()
  // console.log('get token===' + hasToken)
  // const isExists = hasToken ? '是' : '否'
  // console.log('token 是否有值===' + isExists)
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userName) {
        store.dispatch('getUserInfo').then((res) => {
          let index = store.getters.menuUrls.indexOf(to.path)
          if (index < 0) {
            window.location = '#/401'
            return
          }
        })
      }
      next()
    }
  } else {
    /* has no token*/
    // console.log('has no token')
    // console.log('to path===' + to.path)
    //如果没有token就清除该用户相关信息
    store.dispatch('tokenTimeOut')
    //如果to的页面不是登录页，就跳转到登录页
    if (to.path !== '/login') {
      //console.log('has no token redirect to login page!')
      next('/login')
    } else {
      //如果是登录页就继续
      //console.log('redirect login  page')
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
})
