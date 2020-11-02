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
 *更改用户状态
 * @param {用户id,true/false} data
 */
export function changeLock(data) {
  return request({
    url: '/api/user/changeLock',
    method: 'get',
    params: data,
  })
}

/**
 * 判断用户名是否已存在
 * @param {用户名，id} data
 */
export function IsUserNameExists(data) {
  return request({
    url: '/api/user/IsUserNameExists',
    method: 'get',
    params: data,
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
 *绑定角色
 * @param {*} data
 */
export function setRole(data) {
  return request({
    url: '/api/user/setRole',
    method: 'get',
    params: data,
  })
}

/**
 * 解除绑定
 * @param {*} data
 */
export function removeRole(data) {
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
    url: '/api/user/getUserRole',
    method: 'get',
    params: data,
  })
}
//#endregion
