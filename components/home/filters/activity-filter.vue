<template>
  <v-select
    v-if="activities && activities.length"
    :closeOnSelect="false"
    :options="activities"
    label="title"
    :value="selectedActivities"
    placeholder="Activity"
    class="activities capitalize w-full sm:w-56 text-sm sm:text-base"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ActivityFilter',
  computed: mapState({
    activities: ({ volunteers }) => volunteers.activities,
    selectedActivities: ({ volunteers }) => volunteers.selectedActivities,
  }),
  methods: {
    onSelect(values) {
      this.$store.dispatch('volunteers/setSelectedActivities', values)
    },
  },
}
</script>

<style>
.activities .vs__dropdown-menu {
  left: auto;
  right: 0;
  width: max-content;
}
</style>
