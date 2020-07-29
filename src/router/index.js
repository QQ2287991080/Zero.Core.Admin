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
    name: 'icon',
    meta: {
      title: '图标',
      icon: 'icon',
    },
    children: [
      {
        path: '/svg-icons',
        component: () => import('@/views/svg-icons/index'),
        meta: {
          title: '图标',
          icon: 'dashboard',
        },
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
