<template>
  <div class="columns is-centered">
    <div class="column is-one-quarter">
      <CityFilter />
    </div>
  </div>
</template>

<script>
import CityFilter from './city-filter'

export default {
  name: 'SearchFilters',
  components: { CityFilter },
}
</script>
