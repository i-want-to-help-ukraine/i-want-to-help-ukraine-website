import { getVolunteers } from '../utils/requests'

export const state = () => ({
  list: [],
  selectedCity: '',
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
