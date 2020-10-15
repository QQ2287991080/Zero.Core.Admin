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
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          iconType: 'svg',
        },
      },
    ],
  },
  {
    path: '/svg-icons',
    component: Layout,
    //name: '系统设置',
    meta: {
      title: '测试二级菜单',
      icon: 'dashboard',
      iconType: 'svg',
    },
    children: [
      {
        path: '/svg-icons',
        component: () => import('@/views/svg-icons'),
        meta: {
          title: '图标1',
          icon: 'dashboard',
          iconType: 'svg',
        },
      },
      {
        path: '/svg-icon2',
        component: () => import('@/views/svg-icons'),
        meta: {
          title: '图标2',
          icon: 'dashboard',
          iconType: 'svg',
        },
      },
      {
        path: '/test/siderbar',
        component: () => import('@/views/layout/components/mySidebar'),
        meta: {
          title: '测试菜单',
          icon: 'dashboard',
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
          icon: 'user',
          iconType: 'el',
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
