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
