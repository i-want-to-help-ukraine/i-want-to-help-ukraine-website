<template>
  <b-field label="City">
    <b-autocomplete
      v-model="cityValue"
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
  data() {
    return {
      cityValue: '',
    }
  },
  computed: {
    getCityList() {
      return [
        {
          label: 'Kyiv',
          value: 'kyiv',
        },
        {
          label: 'Kharkiv',
          value: 'kharkiv',
        },
      ]
    },
  },
  methods: {
    onSelect(selectedCity) {
      if (selectedCity === null) {
        this.$emit('city-selected', null)
        return
      }

      this.$emit('city-selected', selectedCity.value)
    },
  },
}
</script>
