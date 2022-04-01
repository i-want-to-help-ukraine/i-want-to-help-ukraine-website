<template>
  <v-select
    v-if="contactProviders && contactProviders.length"
    :options="contactProviders.map(({ title }) => title)"
    :model="selectedContactProviders"
    placeholder="Contact Provider"
    class="capitalize w-full sm:w-56"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ContactProviderFilter',
  props: {
    contactProviders: {
      type: Array,
      default: () => [],
    },
  },
  computed: mapState({
    selectedContactProviders: ({ volunteers }) =>
      volunteers.selectedContactProviders,
  }),
  methods: {
    onSelect(values) {
      const ids = values.map((item) => {
        const { id } = this.contactProviders.find(({ title }) => title === item)
        return id
      })

      this.$store.dispatch('volunteers/setSelectedContactProviders', ids)
    },
  },
}
</script>
