<template>
  <div class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { GET_PROFILE } from '../graphql'
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
      const auth0User = await this.$store.dispatch('auth/fetchUserFromAuth0')

      // TODO: uncomment
      //   if (auth0User & this.token) {
      //     const resp = this.$apollo.query({
      //       query: GET_PROFILE,
      //       variables: {
      //         id: auth0User.sub,
      //       },
      //       context: {
      //         headers: {
      //           Authorization: `Bearer ${this.token}`,
      //         },
      //       },
      //     })
      //     this.$store.dispatch('auth/saveUser', resp.profile)
      //     this.$router.push('/edit-profile')
      //   } else {
      //     this.$router.push('/')
      //   }
    },
  },
}
</script>
