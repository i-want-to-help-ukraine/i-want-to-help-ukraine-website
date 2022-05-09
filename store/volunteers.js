import { GET_VOLUNTEER_BY_ID } from '../graphql'

export const state = () => ({
  cities: [],
  activities: [],
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
    return state.cities
  },
  activities(state) {
    return state.activities
  },
}

export const mutations = {
  setCities(state, data) {
    state.cities = data
  },
  setActivities(state, data) {
    state.activities = data
  },
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
    state.currentVolunteer = data
  },
}

export const actions = {
  setCities({ commit }, payload) {
    commit('setCities', payload)
  },
  setActivities({ commit }, payload) {
    commit('setActivities', payload)
  },
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
