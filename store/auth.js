import auth0, { PROTECTED_ROUTES } from '../utils/auth'
import { setCookie, getCookie, deleteCookie } from '../utils/cookies'
import { GET_PROFILE } from '../graphql'

export const state = () => ({
  user: {},
  token: null,
  auth0Id: null,
  userAvatarBase64: null,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  setToken(state, data) {
    state.token = data
  },
  setAuth0Id(state, data) {
    state.auth0Id = data
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
    return !!state.token && !!state.auth0Id
  },
}

export const actions = {
  async authorize({ dispatch }) {
    try {
      await dispatch('fetchUserToken')
      await dispatch('fetchUserAuth0Id')
      await dispatch('fetchUserFromDB')
    } catch (error) {
      console.error(`Authentication Error: ${error.message}`)
    }
  },
  async fetchUserFromAuth0({ state }) {
    if (!state.token) throw new Error('Token is required.')
    try {
      const auth0User = await auth0.getUser()
      return auth0User.sub
    } catch (error) {
      console.error(`fetchUserFromAuth0 Error: ${error.message}`)
    }
  },
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
    // Now you can use state.auth0Id to make requests.
    if (!state.token) throw new Error('Token is required.')

    const apolloClient = this.app.apolloProvider.defaultClient
    const { data } = await apolloClient.query({
      query: GET_PROFILE,
      context: {
        headers: {
          Authorization: `Bearer ${state.token}`,
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
  // Use auth0Id from cookie if it's there,
  // otherwise fetch user from auth0 and set auth0Id to cookie.
  // This method should be used on app load to grab the auth0Id.
  async fetchUserAuth0Id({ dispatch, commit }) {
    let auth0Id = getCookie('auth0Id')
    if (!auth0Id) {
      auth0Id = await dispatch('fetchUserFromAuth0')
    }
    if (auth0Id) {
      commit('setAuth0Id', auth0Id)
      setCookie('auth0Id', auth0Id, 86400)
    }
  },
  // Use token from cookie if it's there,
  // otherwise fetch token from auth0 and set to cookie.
  // This method should be used on app load to grab the token.
  async fetchUserToken({ dispatch, commit }) {
    let token = getCookie('token')
    if (!token) {
      token = await dispatch('fetchUserTokenFromAuth0')
    }
    if (token) {
      commit('setToken', token)
      setCookie('token', token, 86400)
    }
  },
}
