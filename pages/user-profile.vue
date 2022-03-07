<template>
  <div class="px-4 sm:mx-auto lg:w-3/4">
    <profile-header :user-info="user.userData.userInfo" />
    <edit-layout v-if="profile.isProfileEditing" :user-data="user.userData" />
    <view-layout v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditLayout from '../components/user-profile/edit-layout/edit-layout.vue'
import ViewLayout from '../components/user-profile/view-layout/view-layout.vue'
import ProfileHeader from '../components/user-profile/profile-header.vue'

export default {
  name: 'UserProfile',
  components: { EditLayout, ViewLayout, ProfileHeader },
  data: () => ({}),
  computed: mapState(['profile', 'user']),
}
</script>
