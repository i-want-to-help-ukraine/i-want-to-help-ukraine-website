import auth0 from '../utils/auth0'

export const state = () => ({
  user: null,
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
}

export const actions = {
  async fetchUser({ commit }) {
    try {
      await auth0.handleRedirectCallback()
      const token = await auth0.getTokenSilently()
      const user = await auth0.getUser()

      commit('token', token)
      commit('setUser', user)
    } catch (error) {
      console.error(error)
    }
  },
}
