<template>
  <v-select
    v-if="socialProviders && socialProviders.length"
    :options="socialProviders.map(({ title }) => title)"
    :model="selectedSocialProviders"
    placeholder="Social Provider"
    class="capitalize w-full sm:w-56"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SocialProviderFilter',
  props: {
    socialProviders: {
      type: Array,
      default: () => [],
    },
  },
  computed: mapState({
    selectedSocialProviders: ({ volunteers }) =>
      volunteers.selectedSocialProviders,
  }),
  methods: {
    onSelect(values) {
      const ids = values.map((item) => {
        const { id } = this.socialProviders.find(({ title }) => title === item)
        return id
      })

      this.$store.dispatch('volunteers/setSelectedSocialProviders', ids)
    },
  },
}
</script>
