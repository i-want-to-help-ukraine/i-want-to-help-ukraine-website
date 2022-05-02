<template>
  <div class="w-full">
    <div class="mb-5 flex flex-col sm:flex-row justify-between">
      <div class="flex items-baseline mb-4">
        <h4 class="text-xl font-semibold text-gunsmoke">Volunteers</h4>
        <v-select
          :options="countOptions"
          v-model="countToString"
          @input="onCountSelect"
          :clearable="false"
          :searchable="false"
          class="ml-2 sm:w-20"
        />
      </div>
      <search-filters />
    </div>
    <div
      v-if="volunteers.edges.length"
      class="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"
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
import SearchFilters from '../filters/search-filters.vue'
import VolunteerCard from './volunteer-card.vue'

export default {
  name: 'VolunteerList',
  components: { SearchFilters, VolunteerCard },
  data() {
    return {
      countOptions: ['15', '25', '50'],
    }
  },
  props: {
    volunteers: {
      type: Object,
      default: () => {},
    },
    count: {
      type: Number,
      default: 5,
    },
    onCountSelect: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    countToString: {
      get() {
        return String(this.count)
      },
      set(newValue) {
        return newValue
      },
    },
  },
}
</script>
