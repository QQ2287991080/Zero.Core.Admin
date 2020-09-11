//state
const state = {
  isCollapse: false,
}
//mutations
const mutations = {
  //设置菜单折叠
  SET_COLLAPSE(state, value) {
    state.isCollapse = value
  },
}
const actions = {
  //设置折叠
  collapse({ commit }, value) {
    commit('SET_COLLAPSE', value)
  },
}
export default {
  state,
  mutations,
  actions,
}
