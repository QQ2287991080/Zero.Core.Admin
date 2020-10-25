import request from '@/utils/request'
/**
 * 获取菜单树
 */
export function getMenuTree() {
  return request({
    url: '/api/Menu/GetMenuTree',
    method: 'get'
  })
}
/**
 * 验证菜单名称是否唯一
 * @param {*菜单名称} parameter 
 */
export function isExistsName(parameter) {
  return request({
    url: '/api/Menu/IsExistsName',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取菜单详情
 * @param {菜单id} id 
 */
export function details(id) {
  return request({
    url: '/api/Menu/Details',
    method: 'get',
    params: id
  })
}
/**
 * 删除菜单
 * @param {菜单id} id 
 */
export function deleteMenu(id) {
  return request({
    url: '/api/Menu/Delete',
    method: 'get',
    params: id
  })
}
/**
 * 新增菜单
 * @param {*表单} menuForm 
 */
export function addMenu(menuForm) {
  return request({
    url: '/api/Menu/Add',
    method: 'post',
    data: menuForm
  })
}
/**
 * 修改菜单
 * @param {*} menuForm 
 */
export function updateMenu(menuForm) {
  return request({
    url: '/api/Menu/update',
    method: 'post',
    data: menuForm
  })
}