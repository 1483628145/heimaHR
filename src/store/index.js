import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 只暴露了俩个对象一个是模块一个是getters
  // 下面的模块才是VueX的主体
  modules: {
    // 页面交互效果
    app,
    settings,
    // 用户模块
    user
  },
  getters
})

export default store
