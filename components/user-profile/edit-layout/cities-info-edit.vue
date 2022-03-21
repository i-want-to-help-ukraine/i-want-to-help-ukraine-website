<template>
  <div class="flex flex-col">
    <h2 class="text-2xl mb-2">З якими містами ви працюєте</h2>
    <v-select
      v-model="city"
      :options="providersOptions"
      placeholder="Select Activities"
      class="capitalize w-full"
      label="title"
      multiple
    />
  </div>
</template>

<script>
import { GET_CITIES } from '../../../graphql'
export default {
  name: 'CitiesInfo',
  props: {
    defaultValues: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    city: [],
    addSelectView: false,
  }),
  computed: {
    providersOptions() {
      let used = null

      if (!this.cities || !this.cities.length) return []

      used = this.city.map(({ title }) => title)
      return this.cities.filter(({ title }) => !used.includes(title))
    },
  },
  watch: {
    city: {
      handler(city) {
        this.$emit('handleChange', {
          cities: city,
        })
      },
      deep: true,
    },
  },
  beforeMount() {
    this.city = [...this.defaultValues]
  },
  apollo: {
    cities: {
      prefetch: true,
      query: GET_CITIES,
    },
  },
}
</script>
