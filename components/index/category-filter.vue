<template>
  <v-select
    v-if="activities && activities.length"
    :options="activities.map(({ title }) => title)"
    :model="volunteers.selectedCategory"
    placeholder="Category"
    class="capitalize w-full sm:w-56"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'
import { GET_ACTIVITIES } from '../../graphql'
export default {
  name: 'CategoryFilter',
  computed: mapState(['volunteers']),
  apollo: {
    activities: {
      query: GET_ACTIVITIES,
      prefetch: true,
    },
  },
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
