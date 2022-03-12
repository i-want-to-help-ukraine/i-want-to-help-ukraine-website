<template>
  <div class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { CustomLoader } from '../components/UI/index.js'
export default {
  // The responsibility of the page is to fetch and
  // save to store user profile.
  name: 'AuthCallback',
  components: { CustomLoader },
  layout: 'empty',
  async mounted() {
    const auth0User = await this.$store.dispatch('auth/fetchUserFromAuth0')
    // TODO: uncomment
    // const resp = this.$apollo.query({
    //   query: GET_PROFILE,
    //   variables: {
    //     id: auth0User.sub
    //   }
    // });
    // this.$store.dispatch('auth/saveUser')
    this.$router.push('/edit-profile')
  },
  methods: {},
}
</script>
