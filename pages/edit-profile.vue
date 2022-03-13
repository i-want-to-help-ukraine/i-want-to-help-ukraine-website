<template>
  <div class="px-4 sm:px-0 sm:mx-auto lg:w-3/4">
    <profile-header :user-info="user" />
    <edit-layout :user-data="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditLayout from '../components/user-profile/edit-layout/edit-layout.vue'
import ProfileHeader from '../components/user-profile/profile-header.vue'
// import { GET_PROFILE } from '../graphql'

export default {
  name: 'UserProfile',
  components: { EditLayout, ProfileHeader },
  middleware: 'authenticated',
  data: () => ({
    profile: null,
  }),
  computed: mapState({
    user: ({ auth }) => auth.user,
  }),
}
</script>
