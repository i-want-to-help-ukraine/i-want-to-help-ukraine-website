import { GET_VOLUNTEER_BY_ID } from '../graphql'

export const state = () => ({
  selectedCities: [],
  selectedActivities: [],
  selectedSocialProviders: [],
  selectedPaymentProviders: [],
  selectedContactProviders: [],
  currentVolunteer: {},
  isLoading: false,
})

export const getters = {
  filteredList(state) {
    if (!state.selectedCities) return state.list
    return state.list.filter(
      (v) => v.user_metadata.city.toLowerCase() === state.selectedCities
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
  selectedCities(state) {
    return state.selectedCities
  },
}

export const mutations = {
  setSelectedCities(state, data) {
    state.selectedCities = data
  },
  setSelectedActivities(state, data) {
    state.selectedActivities = data
  },
  setSelectedSocialProviders(state, data) {
    state.selectedSocialProviders = data
  },
  setSelectedPaymentProviders(state, data) {
    state.selectedPaymentProviders = data
  },
  setSelectedContactProviders(state, data) {
    state.selectedContactProviders = data
  },
  setCurrentVolunteer(state, data) {
    console.log({ data })
    state.currentVolunteer = data
  },
}

export const actions = {
  setSelectedCities({ commit }, payload) {
    commit('setSelectedCities', payload)
  },
  setSelectedActivities({ commit }, payload) {
    commit('setSelectedActivities', payload)
  },
  setSelectedSocialProviders({ commit }, payload) {
    commit('setSelectedSocialProviders', payload)
  },
  setSelectedPaymentProviders({ commit }, payload) {
    commit('setSelectedPaymentProviders', payload)
  },
  setSelectedContactProviders({ commit }, payload) {
    commit('setSelectedContactProviders', payload)
  },
  setCurrentVolunteer({ commit }, payload) {
    commit('setCurrentVolunteer', payload)
  },
  async getVolunteerById({ commit }, id) {
    const apolloClient = this.app.apolloProvider.defaultClient
    const { data } = await apolloClient.query({
      query: GET_VOLUNTEER_BY_ID,
      context: {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
      variables: {
        input: { id },
      },
    })

    commit('setCurrentVolunteer', data.volunteer)
  },
}
