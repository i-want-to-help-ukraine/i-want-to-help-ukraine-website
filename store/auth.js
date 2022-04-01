import auth0, { PROTECTED_ROUTES } from '../utils/auth'
import { setCookie, getCookie, deleteCookie } from '../utils/cookies'
import { GET_PROFILE } from '../graphql'

const initialValues = {
  firstName: '',
  lastName: '',
  organization: '',
  description: '',
  cities: [],
  activities: [],
  contacts: [],
  social: [],
  payments: [],
  avatarUrl: '',
}

export const state = () => ({
  user: {},
  userForm: initialValues,
  formErrors: {},
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
  setUserForm(state, data) {
    state.userForm = data
  },
  changeUserForm(state, data) {
    state.userForm = {
      ...state.userForm,
      ...data,
    }
  },
  setFormErrors(state, data) {
    state.formErrors = {
      ...state.formErrors,
      ...data,
    }
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
      return console.error(`fetchUserFromAuth0 Error: ${error.message}`)
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

      console.log('currentRouteName', currentRouteName)

      if (PROTECTED_ROUTES.includes(currentRouteName)) dispatch('login')

      return console.error(`fetchUserTokenFromAuth0 Error: ${error.message}`)
    }
  },
  async fetchUserFromDB({ commit, state }) {
    // Now you can use state.token to make requests.
    if (!state.token || !state.auth0Id) throw new Error('Token is required.')

    const apolloClient = this.app.apolloProvider.defaultClient
    const { data } = await apolloClient.query({
      query: GET_PROFILE,
      context: {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
    })
    commit('setUser', { ...data.profile })
    commit('setUserForm', data.profile || initialValues)
  },
  login() {
    try {
      console.log('login', process.env.APP_URL)
      auth0.loginWithRedirect({
        redirect_uri: `${process.env.APP_URL}/auth-callback`,
      })
    } catch (error) {
      console.error(`Login Error: ${error.message}`)
    }
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
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
  handleChangeUserForm({ commit }, payload) {
    commit('changeUserForm', payload)
  },
  setFormErrors({ commit }, payload) {
    commit('setFormErrors', payload)
  },
  async logout({ commit }) {
    await auth0.logout()

    deleteCookie('token')
    deleteCookie('auth0Id')

    commit('setAuth0Id', null)
    commit('setUser', null)
    commit('setToken', null)
  },
}
