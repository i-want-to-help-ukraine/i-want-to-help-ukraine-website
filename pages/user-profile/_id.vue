<template>
  <div class="px-4 sm:px-0 sm:mx-auto lg:w-3/4">
    <profile-header :user-info="userData.userInfo" />
    <view-layout />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileHeader from '../../components/user-profile/profile-header.vue'
import ViewLayout from '../../components/user-profile/view-layout/view-layout.vue'

export default {
  name: 'UserProfile',
  components: { ViewLayout, ProfileHeader },
  data: () => ({}),
  computed: mapState({
    userData: ({ auth }) => auth.userData,
  }),
  mounted() {
    const {
      params: { id: userId },
    } = this.$route
    if (userId) {
      this.$store.dispatch('auth/fetchUserTokenFromAuth0')
    }
  },
}
</script>
