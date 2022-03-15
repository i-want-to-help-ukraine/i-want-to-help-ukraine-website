<template>
  <div class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CustomLoader } from '../components/UI/index.js'

export default {
  // The responsibility of the page is to fetch and
  // save to store user profile.
  name: 'AuthCallback',
  components: { CustomLoader },
  layout: 'empty',

  computed: mapState({
    token: ({ auth }) => auth.token,
  }),
  mounted() {
    this.authorize()
  },
  methods: {
    async authorize() {
      try {
        await this.$store.dispatch('auth/authorize')
        this.$router.push('/edit-profile')
      } catch {
        this.$router.push('/')
      }
    },
  },
}
</script>
