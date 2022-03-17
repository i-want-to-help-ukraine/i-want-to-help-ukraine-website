<template>
  <v-select
    v-if="cities && cities.length"
    :options="cities.map(({ title }) => title)"
    :model="selectedCities"
    placeholder="City"
    class="capitalize w-full sm:w-32"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CityFilter',
  props: {
    cities: {
      type: Array,
      default: () => [],
    },
  },
  computed: mapState({
    selectedCities: ({ volunteers }) => volunteers.selectedCities,
  }),
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
