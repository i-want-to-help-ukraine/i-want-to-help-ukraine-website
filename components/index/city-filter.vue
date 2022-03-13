<template>
  <v-select
    :options="cities.map(({ title }) => title)"
    :model="volunteers.selectedCities"
    placeholder="City"
    class="capitalize w-full sm:w-32"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'
import { GET_CITIES } from '../../graphql'
export default {
  name: 'CityFilter',
  computed: mapState(['volunteers']),
  apollo: {
    cities: {
      query: GET_CITIES,
      prefetch: true,
    },
  },
  methods: {
    onSelect(values) {
      const ids = values.map((item) => {
        const { id } = this.cities.find(({ title }) => title === item)
        return id
      })
      this.$store.dispatch('volunteers/setSelectedCities', ids)
    },
  },
}
</script>

<style scoped>
.v-select .vs__dropdown-toggle {
  border: 1px solid #6dacf6;
}
</style>
