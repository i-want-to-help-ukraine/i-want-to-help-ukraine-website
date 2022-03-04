<template>
  <b-field label="Volunteer Name">
    <b-autocomplete
      v-model="volunteerNameValue"
      :data="getVolunteersList"
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
  name: 'VolunteerNameFilter',
  data() {
    return {
      volunteerNameValue: '',
    }
  },
  computed: {
    getVolunteersList() {
      return [
        {
          label: 'Maria',
        },
        {
          label: 'Tatiana',
        },
      ]
    },
  },
  methods: {
    onSelect() {},
  },
}
</script>
