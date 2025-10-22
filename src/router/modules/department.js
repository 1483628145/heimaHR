import layout from '@/layout'
export default {
  path: '/department',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/department'),
      name: 'department',
      // 路由源信息
      meta: {
        icon: 'tree',
        title: '组织'
      }
    }
  ]
}
