import router from '../router'
import store from '../store'
import { routes } from '../router'
//import Layout from '@/views/layout'

//用户token凭证
const whiteList = ['/login']
//get user info
store.dispatch('getUserInfo').then((res) => {
  // console.log(res)
})
