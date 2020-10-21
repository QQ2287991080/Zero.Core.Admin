import { Loading } from 'element-ui'


//loading数量
let loadingCount = 0
let loading

//开始loading
// const startLoading = () => {
//   loading = Loading.service({
//     lock: true,
//     text: 'Loading',
//     spinner: 'el-icon-loading',
//     background: 'rgba(0, 0, 0, 0.7)',
//   })
// }
const startLoading = () => {
  loading = Loading.service({
    fullscreen: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.8)'
  })
}
//结束
const endLoading = () => loading.close()

//显示loading方法
export const open = () => {
  //如果数量为0
  if (loadingCount === 0) {
    //开始
    startLoading()
  }
  loadingCount += 1
}

//隐藏loading方法
export const close = () => {
  if (loadingCount <= 0) return
  loadingCount -= 1
  if (loadingCount === 0) {
    //关闭
    endLoading()
  }
}
