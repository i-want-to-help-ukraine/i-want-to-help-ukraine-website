<template>
  <custom-loader />
</template>

<script>
import { mapState } from 'vuex'
import { CustomLoader } from '../components/UI/index.js'

export default {
  // The responsibility of the page is to login.
  name: 'Login',
  components: { CustomLoader },
  layout: 'empty',

  computed: mapState({
    token: ({ auth }) => auth.token,
  }),
  mounted() {
    this.authorize()
  },
  methods: {
    authorize() {
      this.$store.dispatch('auth/login')
    },
  },
}
</script>
