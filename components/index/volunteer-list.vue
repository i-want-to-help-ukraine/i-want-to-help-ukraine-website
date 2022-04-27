<template>
  <div class="w-full">
    <div class="mb-5 flex flex-col sm:flex-row justify-between">
      <h4 class="text-xl mb-4 font-semibold text-gunsmoke">Volunteers</h4>
      <search-filters />
    </div>
    <div
      v-if="volunteers.edges.length"
      class="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <nuxt-link
        v-for="{ node: volunteer } in volunteers.edges"
        :key="volunteer.id"
        :to="`/user-profile/${volunteer.id}`"
      >
        <volunteer-card :volunteer="volunteer" />
      </nuxt-link>
    </div>
    <div v-else class="flex justify-center">
      <p>Volunteers not found :(</p>
    </div>
  </div>
</template>

<script>
import SearchFilters from './search-filters.vue'
import VolunteerCard from './volunteer-card.vue'

export default {
  name: 'VolunteerList',
  components: { SearchFilters, VolunteerCard },
  props: {
    volunteers: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
