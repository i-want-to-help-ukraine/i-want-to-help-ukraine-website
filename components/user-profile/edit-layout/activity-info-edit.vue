<template>
  <div class="flex flex-col">
    <h2 class="text-2xl mb-2">Якого роду діяльність виконуєте</h2>
    <v-select
      v-model="activity"
      :options="providersOptions"
      placeholder="Select Activities"
      class="capitalize w-full"
      label="title"
      multiple
    />
  </div>
</template>

<script>
import { GET_ACTIVITIES } from '../../../graphql'
export default {
  name: 'AcitvityInfo',
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
    activity: [],
    addSelectView: false,
  }),
  computed: {
    providersOptions() {
      let used = null

      if (!this.activities || !this.activities.length) return []

      used = this.activity.map(({ title }) => title)
      return this.activities.filter(({ title }) => !used.includes(title))
    },
  },
  watch: {
    activity: {
      handler(activity) {
        this.$emit('handleChange', {
          activities: activity,
        })
      },
      deep: true,
    },
  },
  beforeMount() {
    this.activity = [...this.defaultValues]
  },
  apollo: {
    activities: {
      prefetch: true,
      query: GET_ACTIVITIES,
    },
  },
}
</script>
