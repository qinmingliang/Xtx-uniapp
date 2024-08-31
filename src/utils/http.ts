import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()
const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    options.timeout = 10000
  },
}

// uni.request({
//   url: 'request/login', //仅为示例，并非真实接口地址。
//   success: (res) => {
//     console.log(res.data)
//     // 打印： {code:1,}
//   },
// })

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: 'string'
  msg: 'string'
  result: T
}
// 请求数据包装
export const http = <T>(option: UniApp.RequestOptions) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...option,
      success: (res) => {
        if (res.statusCode > 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res.data as Data<T>)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg,
          })
          reject(res.data as Data<T>)
        }
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          title: '网络异常',
        })
      },
    })
  })
}
