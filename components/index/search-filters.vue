<template>
  <div class="flex">
    <city-filter />
    <category-filter class="ml-2" />
  </div>
</template>

<script>
import CategoryFilter from './category-filter.vue'
import CityFilter from './city-filter.vue'

export default {
  name: 'SearchFilters',
  components: { CityFilter, CategoryFilter },
}
</script>
