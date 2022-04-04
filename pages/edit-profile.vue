<template>
  <div
    v-if="!$apollo.loading"
    class="px-4 lg:px-0 w-full flex flex-col items-center z-0"
  >
    <profile-header editable show-profile-buttons />
    <edit-layout class="max-w-[1000px] w-full" />
  </div>
  <div v-else class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditLayout from '../components/user-profile/edit-layout/edit-layout.vue'
import ProfileHeader from '../components/user-profile/profile-header.vue'
import { CustomLoader } from '../components/UI'

export default {
  name: 'UserProfile',
  components: { EditLayout, ProfileHeader, CustomLoader },
  computed: mapState({
    user: ({ auth }) => auth.user,
    token: ({ auth }) => auth.token,
  }),
  mounted() {
    this.authorize()
  },
  methods: {
    authorize() {
      this.$store.dispatch('auth/authorize')
    },
  },
}
</script>
