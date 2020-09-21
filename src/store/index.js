import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import categories from './modules/categories'
import stories from './modules/stories'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules: {
    categories,
    stories
  },
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    authorities: null,
    bookmarks: null,
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
    setBookmarks(state, bookmarks) {
      state.bookmarks = bookmarks
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
    },
    setBookmarks({commit}, bookmarks) {
      commit('setBookmarks', bookmarks)
    }
  },
  
})