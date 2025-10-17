import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() //从缓存中拿到数据
}

const mutations = {
  // 保存token
  SETTOKEN(state, token) {
    state.token = token
    // 注意这样保存的token一旦刷新那么token就没有了
    // 保存token
    setToken(token)
  },

  // 退出登录
  REMOVETOKEN(state) {
    // 删除vuex token
    state.token = null
    // 删除本地token
    removeToken()
  }
}

const actions = {
  // login 登录
  async login(context, loginForm) {
    // console.log(loginForm)
    // 拿到数据调用登录接口，并放回一个token
    const token = await login(loginForm)
    // 将token给mutation
    context.commit('SETTOKEN', token)
  },
  // 退出登录
  logout(context) {
    context.commit('REMOVETOKEN')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
