<template>
  <v-select
    :options="getVolunteersList"
    :model="volunteerNameValue"
    :reduce="onSelect"
    placeholder="City"
    class="capitalize"
  />
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
