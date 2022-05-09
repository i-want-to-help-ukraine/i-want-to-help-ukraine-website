<template>
  <v-select
    v-if="cities && cities.length"
    :closeOnSelect="false"
    :options="cities"
    label="title"
    :value="selectedCities"
    placeholder="City"
    class="capitalize w-full sm:w-40 text-sm sm:text-base"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CityFilter',
  computed: mapState({
    cities: ({ volunteers }) => volunteers.cities,
    selectedCities: ({ volunteers }) => volunteers.selectedCities,
  }),
  methods: {
    onSelect(values) {
      this.$store.dispatch('volunteers/setSelectedCities', values)
    },
  },
}
</script>

<style scoped>
.v-select .vs__dropdown-toggle {
  border: 1px solid #6dacf6;
}
</style>
