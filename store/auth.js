import auth0 from '../utils/auth'
import { GET_PROFILE } from '../graphql'

export const state = () => ({
  user: {},
  token: null,
  userAvatarBase64: null,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  setToken(state, data) {
    state.token = data
  },
  setUserAvatarBase64(state, data) {
    state.userAvatarBase64 = data
  },
  setAuthId(state, data) {
    state.authId = data
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
  getUserToken(state) {
    return state.token
  },
  isAuthorized(state) {
    return !!state.token
  },
}

export const actions = {
  async authorize({ dispatch, commit, state }) {
    try {
      // Do not change to order of these functions!
      await dispatch('fetchUserTokenFromAuth0')
      const auth0User = await dispatch('fetchUserFromAuth0')
      if (auth0User && auth0User.sub && state.token) {
        commit('setAuthId', auth0User.sub)
        await dispatch('fetchUserFromDB', auth0User.sub)
      }
    } catch (error) {
      console.error(`Authentication Error: ${error.message}`)
    }
  },
  async fetchUserFromAuth0() {
    try {
      const user = await auth0.getUser()
      return user
    } catch (error) {
      console.error(`fetchUserFromAuth0 Error: ${error.message}`)
    }
  },
  // This method should be used on app load to grab the token
  async fetchUserTokenFromAuth0({ commit }) {
    try {
      const token = await auth0.getTokenSilently()
      commit('setToken', token)
    } catch (error) {
      console.error(`fetchUserTokenFromAuth0 Error: ${error.message}`)
    }
  },
  async fetchUserFromDB({ commit }, userAuth0Id) {
    const apolloClient = this.app.apolloProvider.defaultClient
    const { data } = await apolloClient.query({
      query: GET_PROFILE,
      context: {
        headers: {
          // TODO: replace with userAuth0Id
          Authorization: userAuth0Id,
        },
      },
    })
    console.log(data.profile, 'data.profile')
    commit('setUser', { ...data.profile })
  },
  login() {
    auth0.loginWithRedirect({
      redirect_uri: 'http://localhost:3000/auth-callback',
    })
  },
  async logout({ commit }) {
    await auth0.logout()
    commit('setUser', null)
    commit('setToken', null)
  },
  setUserAvatarBase64({ commit }, payload) {
    commit('setUserAvatarBase64', payload)
  },
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
}
