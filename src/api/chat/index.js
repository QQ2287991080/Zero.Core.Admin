import request from '@/utils/request'

export function getDataList() {
  return request({
    url: '/api/chat/getDataList',
    method: 'get',
  })
}

/**
 * 服务器向客户端发送信息
 * @param {*时间} date
 */
export function sendToClient(date) {
  return request({
    url: '/api/chat/sendToClient',
    method: 'get',
    params: { date },
  })
}

/**
 * 手动给后端抛出一个错误信息
 * @param {信息}} message
 */
export function setError(message) {
  return request({
    url: '/api/test/setErr',
    method: 'get',
    params: { message: message },
  })
}
