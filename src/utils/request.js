// axios 封装
// 导入包
import store from '@/store'
import Axios from 'axios'
import { Message } from 'element-ui'

const service = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址 所有的请求都会在前面添加 /api
  timeout: 5000
})

// 请求拦截器 在所有请求发起前做的事
service.interceptors.request.use(
  // 传递俩个回调函数作为参数
  // 其中第一个是成功的回调 第二个是失败的回调
  config => {
    // 请求成功 注入token
    // store.getters.token
    // 判断是否存在token
    if (store.getters.token) {
      // 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
      // 跳转到主页
    }
    return config
  },
  error => {
    // 失败 终止当前
    return Promise.reject(error)
  }
)

// 响应拦截器  主要是解构数据和处理异常请求
// 在所有请求发起后做的事
service.interceptors.response.use(
  // 当响应成功的时候
  response => {
    // 将响应结果解构出来
    const { data, message, success } = response.data
    // 响应成功且请求成功
    if (success) {
      Message({
        type: 'success',
        message: message
      })
      return data
    }
    // 响应成功但是请求失败
    else {
      Message({
        type: 'error',
        message: message
      })
      return Promise.reject(new Error(message))
    }
  },
  // 响应失败的时候
  error => {
    // 提示消息 使用elementui调用message

    Message({
      type: 'error',
      message: error.message
    })

    return Promise.reject(error)
  }
)

export default service
