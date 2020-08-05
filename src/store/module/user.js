import { Login, LoginOut, GetUserInfo } from '@/api/user/index'
import { setToken, getToken, removeToekn } from '@/utils/auth'
import router from '@/router'
//初始化State
const state = {
  token: '',
  realName: '', //真实名称
  userName: '', //用户名
  avatar: '', //头像
  permission: [],
}
//mutations 事件
const mutations = {
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
}

//注册action
const actions = {
  //登录
  login({ commit }, userInfo) {
    console.log('********登录表单********')
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
          //setToken(data.token)
          resolve()
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
        //头像
        commit('SET_AVATAR', data.avatar)
        //真实姓名
        commit('SET_REALNAME', data.realName)
        //用户名
        commit('SET_USERNAME', data.userName)
        //权限
        commit('SET_PERMISSION', data.permission)
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
            removeToekn()
            //头像
            commit('SET_AVATAR', '')
            //真实姓名
            commit('SET_REALNAME', '')
            //用户名
            commit('SET_USERNAME', '')
            //权限
            commit('SET_PERMISSION', [])
          }
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
export default {
  state,
  mutations,
  actions,
}
