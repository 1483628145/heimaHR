import request from '@/utils/request'

// 登录组织架构列表
export function getDepartmentList() {
  return request({
    url: '/company/department',
    method: 'GET',
    noMessage: true
  })
}
