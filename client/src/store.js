import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userLogin: '',
    errMessage: '',
    notif: '',
    baseUrl: 'http://localhost:3000'
  },
  mutations: {
    TOKEN (state, payload) {
      state.token = payload
    },
    USER_LOGIN (state, payload) {
      state.userLogin = payload
    },
    ERROR_MSG(state, payload) {
      state.errMessage = payload
    },
    NOTIF(state, payload) {
      state.notif = payload
    }
  },
  actions: {
    login (context, data) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/users/login`,
        data: {
          email: data.acc,
          password: data.password,
          username: data.acc
        }
      })
      .then((result) => {
        console.log('===>',result.data);
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('email', result.data.email)
        context.commit('TOKEN', localStorage.getItem('token'))
        context.commit('USER_LOGIN',result.data.email)
        context.commit('NOTIF', result.data.message)
        setInterval(function () {
          context.commit('NOTIF', '')
        }, 2000)
        router.push('/')
      })
      .catch((err) => {
        context.commit('ERROR_MSG', err.response.data.message)
        setInterval(function () {
          context.commit('ERROR_MSG', '')
        }, 2000)
      })
    },

    logout(context, data) {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      context.commit('TOKEN', '')
      context.commit('USER_LOGIN', '')
      router.push('/')
    }
  }
})
