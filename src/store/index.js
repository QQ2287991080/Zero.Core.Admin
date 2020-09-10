import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import app from './module/app'
import tag from './module/tag'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
    tag,
  },
  getters: getters,
})
