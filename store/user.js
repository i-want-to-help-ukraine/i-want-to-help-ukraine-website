import auth0 from '../utils/auth0'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  async saveUser({ commit }) {
    try {
      await auth0.handleRedirectCallback()
      // const token = await auth0.getTokenSilently();
      const user = await auth0.getUser()
      commit('setUser', user)
    } catch (error) {
      console.error(error)
    }
  },
}
