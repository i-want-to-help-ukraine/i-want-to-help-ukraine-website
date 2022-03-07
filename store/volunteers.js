import { getVolunteers } from '../utils/requests'

export const state = () => ({
  list: [
    {
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
    },
    {
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
    },
    {
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
    },
  ],
  selectedCity: '',
  cities: ['odesa', 'kyiv', 'lviv'],
})

export const getters = {
  filteredList(state) {
    if (!state.selectedCity) return state.list
    return state.list.filter(
      (v) => v.user_metadata.city.toLowerCase() === state.selectedCity
    )
  },
  cities(state) {
    const citiesLowerCase = state.list.reduce((acc, cur) => {
      const cities = []
      const { user_metadata: userMetadata } = cur
      if (
        userMetadata &&
        userMetadata.city &&
        !cities.includes(userMetadata.city.toLowerCase())
      ) {
        // we should transform the city to lowercase for comparison
        // as we cannot guarantee the volunteer writes it from the capital letter
        acc.push(userMetadata.city.toLowerCase())
      }
      return acc
    }, [])
    // return capitalized cities
    return citiesLowerCase.map(
      (city) => city.charAt(0).toUpperCase() + city.slice(1)
    )
  },
  selectedCity(state) {
    return state.selectedCity
  },
}

export const mutations = {
  setList(state, data) {
    state.list = data
  },
  setSelectedCity(state, data) {
    state.selectedCity = data ? data.toLowerCase() : ''
  },
}

export const actions = {
  async fetchList({ commit }) {
    const volunteers = await getVolunteers()
    commit('setList', volunteers)
  },
  setSelectedCity({ commit }, payload) {
    commit('setSelectedCity', payload)
  },
}
