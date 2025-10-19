import request from '@/utils/request'

// 登录接口获取token
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'get',
    noMessage: true
  })
}

// 修改用户密码
export function updatePassword(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
