import request from '@/utils/request'

/**
 *获取角色列表
 * @param {*} parameter
 */
export function getDataList(parameter) {
  return request({
    url: 'api/role/getDataList',
    method: 'post',
    data: parameter,
  })
}
/**
 *
 * @param {角色名和id} data
 */
export function isExistsName(data) {
  return request({
    url: '/api/role/IsExistsName',
    method: 'get',
    params: data,
  })
}

/**
 * 新增一个角色
 * @param {新增表单} data
 */
export function addRole(data) {
  return request({
    url: '/api/role/add',
    method: 'post',
    data: data,
  })
}

/**
 * 修改已有角色
 * @param {修改表单} data
 */
export function updateRole(data) {
  return request({
    url: '/api/role/update',
    method: 'post',
    data: data,
  })
}
/**
 * 获取单个角色详情
 * @param {角色id} id
 */
export function infoRole(id) {
  var data = { id: id }
  return request({
    url: '/api/role/details',
    method: 'get',
    params: data,
  })
}
/**
 * 删除角色
 * @param {角色id} id
 */
export function deleteRole(id) {
  var data = { id: id }
  return request({
    url: '/api/role/delete',
    method: 'get',
    params: data,
  })
}
/**
 * 获取当前所有能够使用的菜单和权限
 */
export function getMenuPermission() {
  return request({
    url: '/api/role/GetMenuPermission',
    method: 'get',
  })
}

/**
 * 获取角色已经存在的权限
 * @param {角色id} id
 */
export function getRoleExistsPermission(id) {
  var data = { id: id }
  return request({
    url: '/api/role/GetRoleExistPermission',
    method: 'get',
    params: data,
  })
}
/**
 * 设置权限
 * @param {}} data
 */
export function setPermission(data) {
  return request({
    url: '/api/role/setPermission',
    method: 'post',
    data: data,
  })
}
