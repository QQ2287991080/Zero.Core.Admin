import request from '@/utils/request'
//#region  Account

/**
 *用户登录
 * @param {Object} parameter
 */
export function Login(parameter) {
  return request({
    url: 'api/user/Login',
    method: 'post',
    data: parameter,
  })
}

/**
 * 登出
 */
export function LoginOut() {
  return request({
    url: 'api/user/LoginOut',
    method: 'get',
  })
}
/**
 * 获取用户详情，头像，权限，角色等信息
 *
 */
export function GetUserInfo() {
  return request({
    url: 'api/user/getUserInfo',
    method: 'get',
  })
}
/**
 * 获取用户的菜单权限
 */
export function GetAllMenu() {
  return request({
    url: 'api/menu/getAllMenu',
    method: 'get',
  })
}
//#endregion

//#region  user module
/**
 * 获取列表数据
 * @param {查询条件} condition
 */
export function getData(condition) {
  return request({
    url: '/api/user/getDataList',
    method: 'post',
    data: condition,
  })
}

/**
 *新增用户
 * @param {新增表单} form
 */
export function addUser(form) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data: form,
  })
}

/**
 *修改用户
 * @param {修改表单} form
 */
export function updateUser(form) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data: form,
  })
}

/**
 * 获取用户详情
 * @param {用户id*} id
 */
export function infoUser(id) {
  var data = { id: id }
  return request({
    url: '/api/user/details',
    method: 'get',
    params: data,
  })
}

/**
 * 删除用户
 * @param {用户id} id
 */
export function deleteUser(id) {
  var data = { id: id }
  return request({
    url: '/api/user/delete',
    method: 'get',
    params: data,
  })
}
//#endregion

//#region  role
/**
 *
 * @param {用户id} userId
 * @param {角色id} roleId
 */
export function setRole(userId, roleId) {
  var data = { userId, roleId }
  return request({
    url: '/api/user/setRole',
    method: 'get',
    params: data,
  })
}

/**
 *
 * @param {用户id} userId
 * @param {角色id} roleId
 */
export function removeRole(userId, roleId) {
  var data = { userId, roleId }
  return request({
    url: '/api/user/removeRole',
    method: 'get',
    params: data,
  })
}

/**
 * 获取用户已经绑定的角色
 * @param {用户id} userId
 */
export function getUserRole(userId) {
  var data = { userId }
  return request({
    url: '/api/user/setRole',
    method: 'get',
    params: data,
  })
}
//#endregion
