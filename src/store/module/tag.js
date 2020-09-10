const state = {
  id: '11',
  openTags: [],
  activeTags: '',
}
const mutations = {
  //添加tag
  addTag(state, menu) {
    state.openTags.push(menu)
  },
  //改变tag
  changeTag(state, menu) {
    state.activeTags = menu
  },
  //移除
  removeTag(state, menu) {
    var index = state.openTags.indeOf(menu)
    state.openTags.splice(index, 1)
  },
}
