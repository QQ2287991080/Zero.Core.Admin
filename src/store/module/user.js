import { Login, LoginOut, GetUserInfo } from '@/api/user/index'
import { setToken, getToken, removeToken } from '@/utils/auth'
//初始化State
const state = {
  superAdmin: false,
  role: '',
  token: '',
  realName: '', //真实名称
  userName: '', //用户名
  avatar: '', //头像
  permission: [],
  menu: [],
  menuUrls: [], //已存在的菜单
}
//mutations 事件
const mutations = {
  SET_SUPER_ADMIN(state, value) {
    state.superAdmin = value
  },
  SET_ROLE(state, value) {
    state.role = value
  },
  //设置token
  SET_TOEKN: (state, token) => {
    state.token = token
  },
  //设置用户名
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  //设置真实姓名
  SET_REALNAME: (state, realName) => {
    state.realName = realName
  },
  //设置头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  //设则权限值
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  },
  //菜单
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_MENU_URLS: (state, menuUrls) => {
    state.menuUrls = menuUrls
  },
}

//注册action
const actions = {
  //登录
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
    return new Promise((resolve, reject) => {
      //调用登录接口接口
      //{ userName: userName, password: password }
      var loginForm = { userName: userName, password: password }
      Login(loginForm)
        .then((res) => {
          const { data } = res.data
          //token
          setToken(data.token)
          resolve(res)
        })
        .catch((err) => {
          //错误
          reject(err)
        })
    })
  },
  //用户详情
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      //获取用户详情
      GetUserInfo().then((res) => {
        const { data } = res.data
        //console.log('now get userInfo ')
        //console.log(data)
        commit('SET_SUPER_ADMIN', data.isSuperAdmin)
        commit('SET_ROLE', data.role)
        //头像
        commit('SET_AVATAR', data.avatar)
        //真实姓名
        commit('SET_REALNAME', data.realName)
        //用户名
        commit('SET_USERNAME', data.userName)
        //权限
        commit('SET_PERMISSION', data.permissionCode ?? [])
        //菜单
        commit('SET_MENU', data.menu ?? [])
        commit('SET_MENU_URLS', data.menuUrls ?? [])
        resolve(data)
      })
    }).catch((err) => {
      reject(err)
    })
  },
  //退出登录
  loginOut({ commit }) {
    return new Promise((resolve, reject) => {
      //调用退出登录接口
      LoginOut()
        .then((res) => {
          if (res.data.data.statuCode === 200) {
            //token
            removeToken()
            commit('SET_SUPER_ADMIN', false)
            commit('SET_ROLE', '')
            //头像
            commit('SET_AVATAR', '')
            //真实姓名
            commit('SET_REALNAME', '')
            //用户名
            commit('SET_USERNAME', '')
            //权限
            commit('SET_PERMISSION', [])
            //菜单
            commit('SET_MENU', [])
            commit('SET_MENU_URLS', [])
          }
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  //获取用户的菜单
  menu({ commit }) {
    GetAllMenu().then((res) => {
      console.log(res.data.data)
      commit('SET_MENU'), res.data.data
    })
  },
}
export default {
  state,
  mutations,
  actions,
}
