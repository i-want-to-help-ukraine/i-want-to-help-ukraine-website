import auth0 from '../utils/auth0'

export const state = () => ({
  user: null,
  token: null,
  userData: {
    userInfo: {
      firstName: 'Volodymyr',
      lastName: 'Zelenskyi',
      status: 'requested',
      email: 'volodymyr.zelenskyi@mail.com',
      userPic: 'https://kor.ill.in.ua/m/610x385/2715360.jpg',
      description:
        'Test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test',
    },
    socialInfo: {
      facebook: 'fb.com',
      instagram: 'in.com',
    },
    paymentInfo: {
      card: '1111111111111111',
    },
    token: '',
  },
})

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  setToken(state, data) {
    state.token = data
  },
}

export const actions = {
  login() {
    auth0.loginWithRedirect({
      redirect_uri: `http://localhost:3000/auth-callback`,
    })
  },
  async fetchUserFromAuth0({ dispatch }) {
    try {
      // await auth0.handleRedirectCallback()
      // Do not change to order of these functions!
      await dispatch('fetchUserTokenFromAuth0')
      const user = await auth0.getUser()
      // Save token to use for request to our API
      return user
    } catch (error) {
      console.log(error)
      // dispatch('login');
    }
  },
  // This method should be used on app load to grab the token
  async fetchUserTokenFromAuth0({ commit, dispatch }) {
    try {
      const token = await auth0.getTokenSilently()
      const user = await auth0.getUser()
      commit('setToken', token)
      commit('setUser', user)
    } catch (error) {
      // Redirect to login if unable to fetch the token.
      dispatch('login')
    }
  },
  saveUser({ commit }, payload) {
    commit('setUser', payload)
  },
}
