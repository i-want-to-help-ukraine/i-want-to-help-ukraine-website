import auth0 from '../utils/auth'
import { GET_PROFILE } from '../graphql'

export const state = () => ({
  user: null,
  token: null,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  setToken(state, data) {
    state.token = data
  },
  setUserData(state, data) {
    state.userData = data
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
  async authorize({ dispatch, state }, onError) {
    try {
      // Do not change to order of these functions!
      await dispatch('fetchUserTokenFromAuth0')
      const auth0User = await dispatch('fetchUserFromAuth0')
      if (auth0User && auth0User.sub && state.token)
        await dispatch('fetchUserFromDB', auth0User.sub)
    } catch (error) {
      if (onError) onError()
      console.error(`Authentication Error: ${error.message}`)
    }
  },
  async fetchUserFromAuth0() {
    const user = await auth0.getUser()
    return user
  },
  // This method should be used on app load to grab the token
  async fetchUserTokenFromAuth0({ commit }) {
    const token = await auth0.getTokenSilently()
    commit('setToken', token)
  },
  async fetchUserFromDB({ commit, state }, userAuth0Id) {
    const apolloClient = this.app.apolloProvider.defaultClient
    const { data } = await apolloClient.query({
      query: GET_PROFILE,
      context: {
        headers: {
          // TODO: replace with userAuth0Id
          Authorization: `Bearer 1`,
        },
      },
    })
    console.log(data.profile, 'data.profile')
    commit('setUser', data.profile)
  },
  login() {
    auth0.loginWithRedirect({
      redirect_uri: `http://localhost:3000/auth-callback`,
    })
  },
  async logout({ commit }) {
    await auth0.logout()
    commit('setUser', null)
    commit('setToken', null)
  },
}
