<template>
  <div v-if="volunteer.id" class="sm:mx-auto w-full flex flex-col items-center">
    <profile-header class="xs:mt-4" />
    <view-layout :user-info="volunteer" class="max-w-[1000px]" />
  </div>
  <div v-else class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CustomLoader } from '../../components/UI'
import ProfileHeader from '../../components/user-profile/profile-header.vue'
import ViewLayout from '../../components/user-profile/view-layout/view-layout.vue'

export default {
  name: 'UserProfile',
  components: { ViewLayout, ProfileHeader, CustomLoader },
  computed: {
    ...mapState({
      volunteer: ({ volunteers }) => volunteers.currentVolunteer,
      auth: ({ auth }) => auth,
    }),
  },
  beforeCreate() {
    this.$store.dispatch('volunteers/getVolunteerById', this.$route.params.id)
  },
  beforeDestroy() {
    this.$store.dispatch('volunteers/setCurrentVolunteer', {})
  },
}
</script>
