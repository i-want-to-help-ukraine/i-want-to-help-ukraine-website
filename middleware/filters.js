import { GET_CITIES, GET_ACTIVITIES } from '../graphql'

export default (context) => {
  const cities = context.store.getters['volunteers/cities']
  const activities = context.store.getters['volunteers/activities']
  const apolloClient = context.app.apolloProvider.defaultClient

  if (!cities.length) {
    apolloClient
      .query({
        query: GET_CITIES,
      })
      .then(({ data }) => {
        if (data?.cities?.length)
          context.store.dispatch('volunteers/setCities', data.cities)
      })
  }

  if (!activities.length) {
    apolloClient
      .query({
        query: GET_ACTIVITIES,
      })
      .then(({ data }) => {
        if (data?.activities?.length)
          context.store.dispatch('volunteers/setActivities', data.activities)
      })
  }
}
