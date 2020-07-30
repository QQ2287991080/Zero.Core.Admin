import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: '首页✌',
    meta: {
      title: '首页',
      icon: 'dashboard',
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '首页',
          icon: 'dashboard',
        },
      },
    ],
  },
  {
    path: '',
    component: Layout,
    name: '系统设置',
    meta: {
      title: '系统设置',
      icon: 'el-icon-setting',
    },
    children: [
      {
        path: '/svg-icons',
        component: () => import('@/views/svg-icons'),
        meta: {
          title: '图标1',
          icon: 'dashboard',
        },
      },
      {
        path: '/svg-icon2',
        //component: () => import('@/views/svg-icons'),
        meta: {
          title: '图标2',
          icon: 'dashboard',
        },
      },
    ],
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
  },
  {
    path: '*',
    redirect: '/404',
  },
]

const router = new VueRouter({
  routes,
})

export default router
