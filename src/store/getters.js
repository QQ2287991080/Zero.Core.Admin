const { default: user } = require('./module/user')
const { default: app } = require('./module/app')
const getters = {
  realName: (state) => user.state.realName, //真实名称
  userName: (state) => user.state.userName, //用户名
  avatar: (state) => user.state.avatar, //头像
  permission: (state) => user.state.permission, //权限
  menu: (state) => user.state.menu, //菜单
  isCollapse: (state) => app.state.isCollapse,
}
export default getters
