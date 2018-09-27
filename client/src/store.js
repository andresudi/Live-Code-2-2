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
    baseUrl: 'http://localhost:3000',
    tweets: [],
    searchStat: [],
    users: [],
    maTweet: []
  },
  mutations: {
    setMyTweet(state, payload) {
      state.maTweet = payload
    },

    SET_USERS(state, payload) {
      state.users = payload
    },
    SEARCHT (state, payload) {
      state.searchStat = payload
    },

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
    },
    TWEETS (state, payload) {
      state.tweets = payload
    }
  },
  actions: {

    myTweet (context, data) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/status/me`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((result) => {
        context.commit('setMyTweet', result.data.data)
      }).catch((err) => {
        
      });
    },

    deleteTweet (context, data) {
      axios({
        method: 'delete',
        url: `${this.state.baseUrl}/status/${data}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    post (context, data) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/status`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          status: data.status
        }
      })
        .then((result) => {
          console.log(result);
        
          router.push('/')
        })
        .catch((err) => {
          
        });
    },

    allUsers(context, data) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/users`
      })
      .then((result) => {
        context.commit('SET_USERS', result.data.data)
      })
      .catch((err) => {

      })
    },
    searchTweet(context, data) {
 
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/status/search?tweet=${data.tosearch}`
      })
      .then((result) => {
        console.log(result.data.data)
        context.commit('SEARCHT', result.data.data)
      })
      .catch((err) => {

      })
    },

    getAllTweet(context, data) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/status`
      })
        .then((response) => {
          context.commit('TWEETS', response.data.data)
        })
        .catch((err) => {
          
        });
    },

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
        localStorage.setItem('username', result.data.username)
        localStorage.setItem('name', result.data.name)
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
      localStorage.removeItem('username')
      context.commit('TOKEN', '')
      context.commit('USER_LOGIN', '')
      router.push('/')
    }
  }
})
