import request from '@/utils/request'

/**
 * 获取任务分页列表
 * @param {*} data
 */
export function getDataList(data) {
  return request({
    url: '/api/jobs/getdatalist',
    method: 'post',
    data,
  })
}

/**
 * 判断名称是否重复
 * @param {*} name
 * @param {*} id
 */
export function sameName(name, id) {
  return request({
    url: '/api/jobs/sameName',
    method: 'get',
    params: { name, id },
  })
}
/**
 *新增一个任务
 * @param {*} data
 */
export function add(data) {
  return request({
    url: '/api/Jobs/Add',
    method: 'post',
    data,
  })
}

/**
 * 更新任务
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/api/jobs/update',
    method: 'post',
    data,
  })
}

/**
 *获取任务详情
 * @param {*} id
 */
export function details(id) {
  return request({
    url: '/api/jobs/details',
    method: 'get',
    params: { id },
  })
}

/**
 * 删除任务
 * @param {*} id
 */
export function remove(id) {
  return request({
    url: '/api/jobs/delete',
    method: 'get',
    params: { id },
  })
}

/**
 *
 * 以下接口是Quartz调度相关的接口
 */

/**
 * 开启任务调度
 */
export function startQuartz() {
  return request({
    url: '/api/Quartz/Start',
    method: 'get',
  })
}

/**
 * 启动任务
 * @param {任务的id}} id
 */
export function runJob(id) {
  return request({
    url: '/api/Quartz/Run',
    method: 'get',
    params: { id },
  })
}
/**
 * 暂停任务调度
 * @param {任务的id}} id
 */
export function pauseJob(id) {
  return request({
    url: '/api/Quartz/PauseJob',
    method: 'get',
    params: { id },
  })
}
/**
 * 恢复任务调度
 * @param {任务的id}} id
 */
export function resumeJob(id) {
  return request({
    url: '/api/Quartz/ResumeJob',
    method: 'get',
    params: { id },
  })
}
