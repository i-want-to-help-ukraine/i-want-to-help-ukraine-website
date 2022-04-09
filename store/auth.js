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
  authUser: null,
  userForm: { ...initialValues },
  formErrors: {},
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
  authStateChanged(state, { authUser, claims }) {
    if (authUser) {
      const { uid, email, emailVerified, auth } = authUser
      const accessToken = auth.currentUser?.accessToken
      state.authUser = {
        uid,
        email,
        emailVerified,
        accessToken,
      }
    }
    if (claims) {
      state.claims = { ...claims }
    }
  },
  authStateReset(state) {
    state.authUser = null
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
  getUserToken(state) {
    return state.token
  },
}

export const actions = {
  async fetchUserFromDB({ commit }) {
    const { accessToken } = this.$fire.auth.currentUser.auth.currentUser
    console.log({ accessToken })
    const apolloClient = this.app.apolloProvider.defaultClient

    if (!accessToken) throw new Error('Token is required.')

    const { data } = await apolloClient.query({
      query: GET_PROFILE,
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    })
    commit('setUser', data.profile || {})
    commit('setUserForm', data.profile || initialValues)
  },
  setUserAvatarBase64({ commit }, payload) {
    commit('setUserAvatarBase64', payload)
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
    this.$fire.auth.signOut().then(() => {
      commit('authStateReset')
      commit('setUserForm', initialValues)
      commit('setUserAvatarBase64', null)
      this.$router.push('/')
    })
  },
  onAuthStateChangedAction({ commit }, payload) {
    commit('authStateChanged', payload)
    commit('setUser', {})
  },
}
