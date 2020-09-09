import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import categories from './modules/categories'
import lectures from './modules/lectures'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules: {
    categories,
    lectures
  },
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    authorities: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser(state, user) {
      state.user = user
    },
    setAuthorities(state, authorities) {
      state.authorities = authorities
    }
    // setItems(state, {resource, items}) {
    //   state[resource].items = items
    // }
  },
  actions: {
    setToken({
      commit
    }, token) {
      commit('setToken', token)
    },
    setUser({
      commit
    }, user) {
      commit('setUser', user)
    },
    setAuthorities({
      commit
    }, authorities) {
      commit('setAuthorities', authorities)
    }
  },
})