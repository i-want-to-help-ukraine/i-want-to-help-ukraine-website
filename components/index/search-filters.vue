<template>
  <div class="columns is-centered">
    <div class="column is-one-quarter">
      <CityFilter />
    </div>
    <div class="column is-one-quarter">
      <VolunteerNameFilter />
    </div>
  </div>
</template>

<script>
import CityFilter from './city-filter'
import VolunteerNameFilter from './volunteer-name-filter'
export default {
  name: 'SearchFilters',
  components: { VolunteerNameFilter, CityFilter },
}
</script>
