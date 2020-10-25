import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: Layout,
    //redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          iconType: 'svg',
        },
      },
    ],
  },
  {
    path: '/command/technology',
    component: Layout,
    meta: {
      title: '系统功能',
      icon: 'definition',
      iconType: 'svg',
    },
    children: [
      {
        path: '/command/technology',
        component: () => import('@/views/command/technology'),
        meta: {
          title: '技术总览',
          icon: 'document',
          iconType: 'el',
        },
      },
      {
        path: '/command/signalrLog',
        component: () => import('@/views/command/signalrLog'),
        meta: {
          title: '日志推送',
          icon: 'news',
          iconType: 'el',
        },
      },
    ],
  },
  {
    path: '',
    component: Layout,
    meta: {
      title: '系统功能',
      icon: 'icon',
      iconType: 'svg',
    },
    children: [
      {
        path: '/svg-icons',
        component: () => import('@/views/svg-icons'),
        meta: {
          title: '图标管理',
          icon: 'icon',
          iconType: 'svg',
        },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    meta: {
      title: '系统设置',
      icon: 'setting',
      iconType: 'el',
    },
    children: [
      
      {
        path: '/system/role',
        component: () => import('@/views/systemModule/role'),
        meta: {
          title: '角色管理',
          icon: 'role',
          iconType: 'svg',
        },
      },
      {
        path: '/system/menu',
        component: () => import('@/views/systemModule/menu/'),
        meta: {
          title: '菜单管理',
          icon: 'menu',
          iconType: 'el',
        },
      },
      {
        path: '/system/user',
        component: () => import('@/views/systemModule/user/'),
        meta: {
          title: '用户管理',
          icon: 'user',
          iconType: 'el',
        },
      }
    ],
  },
  {
    path: '/login',
    //name: 'login',
    component: () => import('@/views/login'),
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
