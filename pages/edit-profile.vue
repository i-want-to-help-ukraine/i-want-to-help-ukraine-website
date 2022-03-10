<template>
  <div class="px-4 sm:px-0 sm:mx-auto lg:w-3/4">
    <profile-header :user-info="userData.userInfo" />
    <edit-layout :user-data="userData" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditLayout from '../components/user-profile/edit-layout/edit-layout.vue'
import ProfileHeader from '../components/user-profile/profile-header.vue'

export default {
  name: 'UserProfile',
  components: { EditLayout, ProfileHeader },
  data: () => ({}),
  computed: mapState({
    userData: ({ auth }) => auth.userData,
  }),
  mounted() {
    this.$store.dispatch('auth/fetchUserFromAuto0')
  },
}
</script>
