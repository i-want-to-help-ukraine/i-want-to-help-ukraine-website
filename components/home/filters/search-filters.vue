<template>
  <div class="flex items-start">
    <city-filter :cities="cities" />
    <activity-filter :activities="activities" class="ml-2" />
  </div>
</template>

<script>
import { GET_CITIES, GET_ACTIVITIES } from '../../../graphql'
import CityFilter from './city-filter.vue'
import ActivityFilter from './activity-filter.vue'

export default {
  name: 'SearchFilters',
  components: {
    CityFilter,
    ActivityFilter,
  },
  apollo: {
    cities: {
      query: GET_CITIES,
      // prefetch: true,
    },
    activities: {
      query: GET_ACTIVITIES,
      // prefetch: true,
    },
  },
}
</script>
