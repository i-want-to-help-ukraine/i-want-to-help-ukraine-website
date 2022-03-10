<template>
  <v-select
    :options="volunteers.categories"
    :model="volunteers.selectedCategory"
    :reduce="onSelect"
    placeholder="Category"
    class="capitalize w-full sm:w-56"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CategoryFilter',
  computed: mapState(['volunteers']),
  methods: {
    onSelect(value) {
      this.$store.dispatch('volunteers/setSelectedCategory', value)
    },
  },
}
</script>
