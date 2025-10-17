// 路由守卫

import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'

// 路由前置守卫
const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  // to 到那里去
  // from 从哪里来
  // next 必须要执行
  nProgress.start()

  // 判断是否有token
  if (store.getters.token) {
    // 判断是不是去的登录
    if (to.path === '/login') {
      // 有token的情况下去登录页面直接跳转到主页
      next('/')
      // 手动关闭进度条
      nProgress.done()
    } else {
      // 有token的情况下去非登录页，直接放行
      next()
    }
  } else {
    // 没有token的情况
    // 看是否在白名单
    if (whiteList.includes(to.path)) {
      next()
      nProgress.done()
    } else {
      next('/login')
      nProgress.done()
    }
  }
})

// 路由后置守卫
router.afterEach(() => {
  nProgress.done()
})
