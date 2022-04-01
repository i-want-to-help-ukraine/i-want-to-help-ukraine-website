<template>
  <div class="flex flex-col">
    <h2 class="text-2xl mb-2">З якими містами ви працюєте</h2>
    <v-select
      :value="userForm.cities"
      :options="providersOptions"
      placeholder="Select Cities"
      class="capitalize w-full"
      label="title"
      multiple
      @input="handleChange"
    />
    <error-message :error="errors.cities" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GET_CITIES } from '../../../graphql'
import ErrorMessage from '../../UI/error-message.vue'

export default {
  name: 'CitiesInfo',
  components: {
    ErrorMessage,
  },
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

      if (!this.cities || !this.cities.length) return []

      used = this.userForm.cities?.map(({ title }) => title)
      return this.cities.filter(({ title }) => !used?.includes(title))
    },
    ...mapState({
      userForm: ({ auth }) => auth.userForm,
    }),
  },
  methods: {
    handleChange(cities) {
      this.$store.dispatch('auth/handleChangeUserForm', { cities })
    },
  },
  apollo: {
    cities: {
      prefetch: true,
      query: GET_CITIES,
    },
  },
}
</script>
