export const state = () => ({
  isProfileEditing: false,
})

export const getters = {}

export const mutations = {
  setIsProfileEditing(state, data) {
    state.isProfileEditing = data
  },
}

export const actions = {
  setIsProfileEditing({ commit }, payload) {
    commit('setIsProfileEditing', payload)
  },
}
