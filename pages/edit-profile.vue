<template>
  <div v-if="user" class="px-4 sm:px-0 w-full flex flex-col items-center">
    <profile-header editable show-profile-buttons :user-info="user" />
    <edit-layout :user-data="user" class="max-w-[1000px] w-full" />
  </div>
  <div v-else class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { EditLayout } from '../components/user-profile/edit-layout'
import ProfileHeader from '../components/user-profile/profile-header.vue'
import { CustomLoader } from '../components/UI/index.js'

export default {
  name: 'UserProfile',
  components: { EditLayout, ProfileHeader, CustomLoader },
  computed: mapState({
    user: ({ auth }) => auth.user,
    isAuthorized: ({ auth }) => !!auth.token,
  }),
  mounted() {
    if (!this.isAuthorized) this.$store.dispatch('auth/login')
  },
}
</script>
