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
  setUserData(state, data) {
    state.userData = data
  },
}

export const actions = {
  async fetchUserFromAuto0({ commit }) {
    try {
      await auth0.handleRedirectCallback()

      const user = await auth0.getUser()
      this.fetchTokenFromAuth0()
      if (user) {
        // TODO: fetch user from our DB with user.sub
        // as soon as we get it — save user to the store
        // commit('setUser', user)
      }

      // Save token to use for request to our API
    } catch (error) {
      console.error(error)
    }
  },
  fetchUserFromDB({ commit }, userId) {
    try {
      console.log(userId, 'userId')
      // TODO: fetch user from our DB
      // commit('setUserData', data);
    } catch (error) {
      // redirect away
      // should we let the error bubble up?
    }
  },
  // This method should be used on app load to grab the token
  async fetchUserTokenFromAuth0({ commit }) {
    try {
      const token = await auth0.getTokenSilently()
      console.log(token, 'token')
      commit('setToken', token)
    } catch (error) {
      console.error(error)
    }
  },
  async logout({ commit }) {
    try {
      await auth0.loginWithRedirect({ redirect_uri: 'http://localhost:3000' })
      commit('setToken', null)
      commit('setUser', null)
    } catch (error) {
      console.error(error)
    }
  },
}
