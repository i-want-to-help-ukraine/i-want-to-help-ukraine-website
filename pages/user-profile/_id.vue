<template>
  <div v-if="volunteer" class="sm:mx-auto px-4 sm:px-16 max-w-[1000px] w-full">
    <profile-header :user-info="volunteer" />
    <view-layout :user-info="volunteer" />
  </div>
  <div v-else class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { CustomLoader } from '../../components/UI/index.js'
import ProfileHeader from '../../components/user-profile/profile-header.vue'
import ViewLayout from '../../components/user-profile/view-layout/view-layout.vue'
import { GET_VOLUNTEER_BY_ID } from '../../graphql'

export default {
  name: 'UserProfile',
  components: { ViewLayout, ProfileHeader, CustomLoader },
  data: () => ({}),
  apollo: {
    volunteer: {
      query: GET_VOLUNTEER_BY_ID,
      prefetch: true,
      variables() {
        return { input: { id: this.$route.params.id } }
      },
    },
  },
  mounted() {
    // if (!this.volunteer) this.$router.replace('/404')
  },
}
</script>
