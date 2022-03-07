<template>
  <v-select
    :options="volunteers.cities"
    :model="volunteers.selectedCity"
    :reduce="onSelect"
    placeholder="City"
    class="capitalize w-full sm:w-32"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CityFilter',
  computed: mapState(['volunteers']),
  methods: {
    onSelect(selectedCity) {
      this.$store.dispatch('volunteers/setSelectedCity', selectedCity)
    },
  },
}
</script>
