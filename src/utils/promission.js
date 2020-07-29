import router from '../router'
//import Layout from '@/views/layout'

var getRouter //用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  console.log('路由')
  if (!getRouter) {
    //不加这个判断，路由会陷入死循环
    if (!getObjArr('router')) {
      // easy-mock官网经常挂掉，所以就不请求了,你们可以替换成自己公司的接口去请求,把下方的axios请求打开即可
      // axios.get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter').then(res => {
      getRouter = router.options.routes
      console.log('beforeEach  getRouter')
      //getRouter = fakeRouter.router //假装模拟后台请求得到的路由数据
      //saveObjArr('router', getRouter) //存储路由到localStorage
      // getRouter = fakeRouter.router
      routerGo(to, next) //执行路由跳转方法
      // })
    } else {
      //从localStorage拿到了路由
      getRouter = getObjArr('router') //拿到路由
      routerGo(to, next)
    }
  } else {
    next()
  }
})

function routerGo(to, next) {
  console.log('routerGo')
  getRouter = filterAsyncRouter(getRouter) //过滤路由

  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function saveObjArr(name, data) {
  //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) {
  //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name))
}

function filterAsyncRouter(asyncRouterMap) {
  console.log(asyncRouterMap)
  const accessedRouters = asyncRouterMap.filter((item) => {
    return item
  })
  return accessedRouters
}
// function filterAsyncRouter(asyncRouterMap) {
//   //遍历后台传来的路由字符串，转换为组件对象
//   console.log('======================')
//   console.log(getRouter)
//   const accessedRouters = asyncRouterMap.filter((route) => {
//     if (route.component) {
//       if (route.component === 'Layout') {
//         //Layout组件特殊处理
//         route.component = Layout
//       } else {
//         route.component = _import(route.component)
//       }
//     }
//     if (route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children)
//     }
//     return true
//   })

//   return accessedRouters
// }
