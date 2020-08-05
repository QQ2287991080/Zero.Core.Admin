import router from '../router'
import { routes } from '../router'
import { getToken } from './auth'
//import Layout from '@/views/layout'

//用户token凭证
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    console.log(to.path)
    if (to.path === '/login') {
      console.log('跳转home')
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      console.log('xxxxxx')
      router.addRoutes(routes)
      // hack method to ensure that addRoutes is complete
      // set the replace: true, so the navigation will not leave a history record
      next({ ...to, replace: true })
    }
  } else {
    /* has no token*/
    next()
    // if (whiteList.indexOf(to.path) !== -1) {
    //   // in the free login whitelist, go directly
    //   next()
    // } else {
    //   console.log(to.path)
    //   // other pages that do not have permission to access are redirected to the login page.
    //   //next(`/login?redirect=${to.path}`)
    //   // if (to.path === '/login') {
    //   //   next()
    //   // } else {
    //   //   next('/login')
    //   // }
    // }
  }
})

router.afterEach(() => {
  // finish progress bar
})
