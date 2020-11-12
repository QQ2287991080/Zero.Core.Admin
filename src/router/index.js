import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
Vue.use(VueRouter)

export const routes = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          iconType: 'svg',
          keepAlive: true,
          affix: true
        },
      },
    ],
  },
  {
    path: '/redirect',
    component: Layout,
    // hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
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
          keepAlive: true,
        },
      },
      {
        path: '/command/signalrLog',
        component: () => import('@/views/command/signalrLog'),
        meta: {
          title: '日志推送',
          icon: 'news',
          iconType: 'el',
          keepAlive: true,
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
          keepAlive: true,
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
        path: '/system/dictionary',
        component: () => import('@/views/systemModule/diction'),
        meta: {
          title: '字典管理',
          icon: 'full-screen',
          iconType: 'el',
          keepAlive: true,
        },
      },
      {
        path: '/system/role',
        component: () => import('@/views/systemModule/role'),
        meta: {
          title: '角色管理',
          icon: 'role',
          iconType: 'svg',
          keepAlive: true,
        },
      },
      {
        path: '/system/menu',
        component: () => import('@/views/systemModule/menu/'),
        meta: {
          title: '菜单管理',
          icon: 'menu',
          iconType: 'el',
          keepAlive: true,
        },
      },
      {
        path: '/system/user',
        component: () => import('@/views/systemModule/user/'),
        meta: {
          title: '用户管理',
          icon: 'user',
          iconType: 'el',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '',
    component: Layout,
    meta: {
      title: '个人中心',
      icon: 'user',
      iconType: 'el',
    },
    children: [
      {
        path: '/personCenter',
        component: () => import('@/views/personCenter'),
        meta: {
          title: '个人中心',
          icon: 'user',
          iconType: 'el',
          keepAlive: true,
        },
      },
    ],
  },
  {
    component: Layout,
    path: '/empty',
    name: 'empty',
    meta: {
      title: '空白',
      icon: 'user',
      iconType: 'el',
      keepAlive: false,
    },
    children: [
      {
        path: '/empty',
        component: () => import('@/views/empty'),
        meta: {
          title: '空白',
          icon: 'user',
          iconType: 'el',
          keepAlive: false,
        },
      },
    ],
  },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404',
  //     iconType: 'el',
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: '暂无权限',
  //       meta: { title: '401' }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: '未找到',
  //       meta: { title: '404' }
  //     }
  //   ]
  // },
  {
    path: '/login',
    //name: 'login',
    component: () => import('@/views/login'),
  },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  // },
  // {
  //   path: '/404',
  //   component: () => import('@/views/errorPage/404'),
  // },
  {
    path: '*',
    redirect: '/404',
  },
]

const router = new VueRouter({
  routes,
})

export default router
