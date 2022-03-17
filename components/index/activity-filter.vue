<template>
  <v-select
    v-if="activities && activities.length"
    :options="activities.map(({ title }) => title)"
    :model="selectedActivities"
    placeholder="Activity"
    class="capitalize w-full sm:w-56"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ActivityFilter',
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
  },
  computed: mapState({
    selectedActivities: ({ volunteers }) => volunteers.selectedActivities,
  }),
  methods: {
    onSelect(values) {
      const ids = values.map((item) => {
        const { id } = this.activities.find(({ title }) => title === item)
        return id
      })

      this.$store.dispatch('volunteers/setSelectedActivities', ids)
    },
  },
}
</script>
