<template>
  <v-select
    :options="volunteers.cities"
    :model="volunteers.selectedCity"
    :reduce="onSelect"
    placeholder="City"
    class="capitalize"
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
