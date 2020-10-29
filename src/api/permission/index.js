import request from '@/utils/request'

/**
 *根据菜单id获取权限列表
 * @param {菜单id} menuId
 */
export function getMenuPermission(menuId) {
  return request({
    url: '/api/permission/getMenuPermission',
    method: 'get',
    params: menuId,
  })
}
/**
 * 判断权限code是否存在
 * @param {权限编号和id} data
 */
export function isExistsCode(data) {
  return request({
    url: '/api/permission/isExistsCode',
    method: 'get',
    params: data,
  })
}
/**
 * 新增
 * @param {新增表单} form
 */
export function addPermission(form) {
  return request({
    url: '/api/permission/add',
    method: 'post',
    data: form,
  })
}
/**
 * 修改
 * @param {修改表单} form
 */
export function updatePermission(form) {
  return request({
    url: '/api/permission/update',
    method: 'post',
    data: form,
  })
}

/**
 * 删除权限
 * @param {权限id} id
 */
export function removePermission(id) {
  var data = { id: id }
  return request({
    url: '/api/permission/delete',
    method: 'get',
    params: data,
  })
}
/**
 * 权限详情
 * @param {权限id} id
 */
export function detailsPermission(id) {
  return request({
    url: '/api/permission/details',
    method: 'get',
    params: id,
  })
}
