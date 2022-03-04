export const actions = {
  async nuxtServerInit({ dispatch }) {
    await Promise.allSettled([dispatch('volunteers/fetchVolunteers')])
  },
}
