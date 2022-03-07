<template>
  <b-field label="City">
    <b-autocomplete
      :value="cityValue"
      :data="getCityList"
      field="label"
      open-on-focus
      clearable
      @select="onSelect"
    >
      <template #empty>No empty results</template>
    </b-autocomplete>
  </b-field>
</template>

<script>
export default {
  name: 'CityFilter',
  computed: {
    getCityList() {
      return this.$store.getters['volunteers/cities']
    },
    cityValue() {
      return this.$store.getters['volunteers.selectedCity']
    },
  },
  methods: {
    onSelect(selectedCity) {
      this.$store.dispatch('volunteers/setSelectedCity', selectedCity)
    },
  },
}
</script>
