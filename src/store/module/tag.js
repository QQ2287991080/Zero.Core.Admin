//dashboard
const state = {
  options: [{ path: '/dashboard', name: '首页' }],
  activeIndex: '/dashboard',
}
const mutations = {
  // 添加tabs
  add_tabs(state, data) {
    state.options.push(data)
  },
  // 删除tabs
  delete_tabs(state, path) {
    let index = 0
    for (let option of state.options) {
      if (option.path === path) {
        break
      }
      index++
    }
    state.options.splice(index, 1)
  },
  // 设置当前激活的tab
  set_active_index(state, index) {
    state.activeIndex = index
  },
}

const actions = {
  //添加tab
  addTab({ commit }, data) {
    commit('add_tabs', data)
    sessionStorage.setItem('tabs', null)
    sessionStorage.setItem('tabs', JSON.stringify(state.options))
  },

  deleteTab({ commit }, path) {
    commit('delete_tabs', path)
    //清空
    sessionStorage.setItem('tabs', null)
    sessionStorage.setItem('tabs', JSON.stringify(state.options))
  },
  setActiveIndex({ commit }, index) {
    commit('set_active_index', index)
    sessionStorage.setItem('activeIndex', null)
    sessionStorage.setItem('activeIndex', state.activeIndex)
  },
}
export default {
  state,
  mutations,
  actions,
}
