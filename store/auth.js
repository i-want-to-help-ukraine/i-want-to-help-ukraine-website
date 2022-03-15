import auth0 from '../utils/auth0'
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
  isAuthenticated(state) {
    return !!state.token
  },
}

export const actions = {
  login() {
    auth0.loginWithRedirect({
      redirect_uri: `http://localhost:3000/auth-callback`,
    })
  },
  async authorize({ dispatch, state }) {
    // Do not change to order of these functions!
    await dispatch('fetchUserTokenFromAuth0')
    const auth0User = await dispatch('fetchUserFromAuth0')
    if (auth0User && auth0User.sub && state.token)
      dispatch('fetchUserFromDB', auth0User.sub)
  },
  async fetchUserFromAuth0({ dispatch }) {
    try {
      const user = await auth0.getUser()
      return user
    } catch (error) {
      // Redirect to login if unable to fetch auth0 user.
      dispatch('login')
    }
  },
  // This method should be used on app load to grab the token
  async fetchUserTokenFromAuth0({ commit, dispatch }) {
    try {
      const token = await auth0.getTokenSilently()
      commit('setToken', token)
    } catch (error) {
      // Redirect to login if unable to fetch the token.
      dispatch('login')
    }
  },
  async fetchUserFromDB({ dispatch, state }, userAuth0Id) {
    const apolloClient = this.app.apolloProvider.defaultClient
    const { data } = await apolloClient.query({
      query: GET_PROFILE,
      variables: {
        input: {
          // TODO: replace by userAuth0Id
          id: '1',
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
    })
    console.log(data.profile, 'data.profile')
    if (data) dispatch('saveUser', data.profile)
  },
  saveUser({ commit }, user) {
    commit('setUser', user)
  },
}
