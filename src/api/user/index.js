import request from '@/utils/request'

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
