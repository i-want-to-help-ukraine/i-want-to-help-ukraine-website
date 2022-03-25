import auth0, { PROTECTED_ROUTES } from '../utils/auth'
import { setCookie, getCookie, deleteCookie } from '../utils/cookies'
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
  async authorize({ dispatch }) {
    try {
      await dispatch('fetchUserToken')
      await dispatch('fetchUserFromDB')
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
  async fetchUserTokenFromAuth0({ dispatch }) {
    try {
      return await auth0.getTokenSilently()
    } catch (error) {
      const {
        router: {
          history: {
            current: { name: currentRouteName },
          },
        },
      } = this.app

      if (PROTECTED_ROUTES.includes(currentRouteName)) dispatch('login')

      console.error(`fetchUserTokenFromAuth0 Error: ${error.message}`)
    }
  },
  async fetchUserFromDB({ commit, state }) {
    if (!state.token) throw new Error('Token is required.')

    const apolloClient = this.app.apolloProvider.defaultClient
    const { data } = await apolloClient.query({
      query: GET_PROFILE,
      context: {
        headers: {
          Authorization: state.token,
        },
      },
    })
    console.log(data.profile, 'data.profile')
    commit('setUser', { ...data.profile })
  },
  login() {
    try {
      auth0.loginWithRedirect({
        redirect_uri: `${process.env.APP_URL}/auth-callback`,
      })
    } catch (error) {
      console.error(`Login Error: ${error.message}`)
    }
  },
  async logout({ commit }) {
    await auth0.logout()
    deleteCookie('token')
    commit('setUser', null)
    commit('setToken', null)
  },
  setUserAvatarBase64({ commit }, payload) {
    commit('setUserAvatarBase64', payload)
  },
  // Use token from cookie if it's there,
  // otherwise fetch token from auth0 and set to cookie.
  async fetchUserToken({ dispatch, commit }) {
    let token = getCookie('token')
    if (!token) {
      token = await dispatch('fetchUserTokenFromAuth0')
    }
    commit('setToken', token)
    setCookie('token', token, 86400)
  },
}
