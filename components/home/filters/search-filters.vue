<template>
  <div class="flex items-start">
    <city-filter />
    <activity-filter class="ml-2" />
  </div>
</template>

<script>
import CityFilter from './city-filter.vue'
import ActivityFilter from './activity-filter.vue'

export default {
  name: 'SearchFilters',
  components: {
    CityFilter,
    ActivityFilter,
  },
}
</script>
