<template>
  <div class="columns is-centered">
    <div class="column is-one-quarter">
      <CityFilter @city-selected="onCitySelect" />
    </div>
  </div>
</template>

<script>
import CityFilter from './city-filter'

export default {
  name: 'SearchFilters',
  components: { CityFilter },
  methods: {
    onCitySelect(cityValue) {
      this.$emit('city-selected', cityValue)
    },
  },
}
</script>
