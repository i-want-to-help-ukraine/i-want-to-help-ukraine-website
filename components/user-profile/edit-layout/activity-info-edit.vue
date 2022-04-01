<template>
  <div class="flex flex-col">
    <h2 class="text-2xl mb-2">Якого роду діяльність виконуєте</h2>
    <v-select
      :value="userForm.activities"
      :options="providersOptions"
      placeholder="Select Activities"
      class="capitalize w-full"
      label="title"
      multiple
      @input="handleChange"
    />
    <error-message :error="errors && errors.activities" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GET_ACTIVITIES } from '../../../graphql'
import errorMessage from '../../UI/error-message.vue'

export default {
  components: { errorMessage },
  name: 'AcitvityInfo',
  props: {
    errors: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    addSelectView: false,
  }),
  computed: {
    providersOptions() {
      let used = null

      if (!this.activities || !this.activities.length) return []

      used = this.userForm.activities?.map(({ title }) => title)
      return this.activities.filter(({ title }) => !used?.includes(title))
    },
    ...mapState({
      userForm: ({ auth }) => auth.userForm,
    }),
  },
  methods: {
    handleChange(activities) {
      this.$store.dispatch('auth/handleChangeUserForm', { activities })
    },
  },
  apollo: {
    activities: {
      prefetch: true,
      query: GET_ACTIVITIES,
    },
  },
}
</script>
