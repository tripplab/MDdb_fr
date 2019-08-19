import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import loginService from '@/services/login'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    authenticated: false,
    authError: null,
    expires_at: 0,
    selectedElement: { type: null, data: { id: 0 } },
    token: '',
    username: ''
  },
  mutations: {
    authUser (state, username) {
      state.authenticated = true
      state.authError = null
      state.username = username
    },
    authError (state, e) {
      state.authError = e
      state.authenticated = false
      state.expires_at = 0
      state.token = ''
      state.username = ''
      state.selectedElement = { type: null, data: { id: 0 } }
    },
    logout (state) {
      state.authenticated = false
      state.authError = null
      state.expires_at = 0
      state.token = ''
      state.username = ''
      state.selectedElement = { type: null, data: { id: 0 } }
    },
    saveExpiration (state, time) {
      state.expires_at = time
    },
    saveToken (state, token) {
      state.token = 'Bearer ' + token
    }
  },
  getters: {
    getSelectedElement (state) {
      return state.selectedElement
    },
    getToken (state) {
      return state.token
    },
    getUsername (state) {
      return state.username
    },
    loggedIn (state) {
      return state.token.length > 10 && state.expires_at > (new Date()).getTime()
    }
  },
  actions: {
    signin ({ commit, state }, { email, password }) {
      return loginService.auth({ email, password })
        .then(res => {
          commit('authUser', res.user.name)
          commit('saveExpiration', (res.expires_in * 1000 + (new Date()).getTime()))
          commit('saveToken', res.token)

          return true
        })
        .catch(({ response }) => {
          commit('authError', response)
          commit('saveExpiration', 0)

          return state.AuthError
        })
    }
  }
})
