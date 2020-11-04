import request from '@/utils/request'

/**
 * 获取树
 */
export function getTree() {
  return request({
    url: '/api/dictionaries/getTree',
    method: 'get'
  })
}


/**
 * 新增
 * @param {*} form 
 */
export function dicAdd(form) {
  return request({
    url: '/api/dictionaries/add',
    method: 'post',
    data: form
  })
}
/**
 * 验证名称是否重复，不同节点的名称允许重复，同一节点下的名称不允许重复
 * @param {*} data 
 */
export function isContains(data) {
  return request({
    url: '/api/dictionaries/isContains',
    method: 'get',
    params: data
  })
}
/**
 * 修改
 * @param {*} form 
 */
export function dicUpdate(form) {
  return request({
    url: '/api/dictionaries/Update',
    method: 'post',
    data: form
  })
}

/**
 * 获取详情
 * @param {*} id 
 */
export function dicInfo(id) {
  return request({
    url: '/api/dictionaries/details',
    method: 'get',
    params: { id }
  })
}

/**
 * 获取详情
 * @param {*} id 
 */
export function dicDelete(id) {
  return request({
    url: '/api/dictionaries/delete',
    method: 'get',
    params: { id }
  })
}