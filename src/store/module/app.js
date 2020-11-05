//state
const state = {
  isCollapse: false,
  avatarMenuVisible: false
}
//mutations
const mutations = {
  //设置菜单折叠
  SET_COLLAPSE(state, value) {
    state.isCollapse = value
  },
  //头像下拉菜单
  SET_AVATAR_MENU(state, value) {
    state.avatarMenuVisible = value
  }
}
const actions = {
  //设置折叠
  collapse({ commit }, value) {
    commit('SET_COLLAPSE', value)
  },
  avatarMenuVisible({ commit }, value) {
    commit('SET_AVATAR_MENU', value)
  }
}
export default {
  state,
  mutations,
  actions,
}
