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
    followCount: {
      followers: 0,
      following: 0,
    },
    currentStory: {
      id: 0,
      HTML: ``,
      JSON: null,
    },
    updatedStory: {
      HTML: ``,
      JSON: null,
    },
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
    },
    setCurrentStoryHTML(state, story) {
      state.currentStory.HTML = story
    },
    setCurrentStoryJSON(state, story) {
      state.currentStory.JSON = story
    },
    setCurrentStoryId(state, story) {
      state.currentStory.id = story
    },
    setUpdatedStoryHTML(state, story) {
      state.updatedStory.HTML = story
    },
    setUpdatedStoryJSON(state, story) {
      state.updatedStory.JSON = story
    },
        setFollowersCount(state, followerCount) {
            state.follower.followers = followerCount
          },
          setFollowingCount(state, followingCount) {
            state.follower.following = followingCount
          },

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
    setBookmarks({
      commit
    }, bookmarks) {
      commit('setBookmarks', bookmarks)
    },
    setCurrentStoryJSON({
      commit
    }, story) {
      commit('setCurrentStoryJSON', story)
    },
    setCurrentStoryHTML({
      commit
    }, story) {
      commit('setCurrentStoryHTML', story)
    },
    setCurrentStoryId({
      commit
    }, story) {
      commit('setCurrentStoryId', story)
    },
    setUpdatedStoryHTML({
      commit
    }, story) {
      commit('setUpdatedStoryHTML', story)
    },
    setUpdatedStoryJSON({
      commit
    }, story) {
      commit('setUpdatedStoryJSON', story)
    },
        setFollowersCount({
          commit
        }, followerCount) {
          commit('setFollowersCount', followerCount)
        },
            setFollowingCount({
              commit
            }, followingCount) {
              commit('setFollowingCount', followingCount)
            }
  },

})