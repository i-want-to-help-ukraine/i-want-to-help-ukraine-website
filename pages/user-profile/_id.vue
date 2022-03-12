<template>
  <div class="sm:mx-auto px-16 max-w-[1800px] w-full">
    <profile-header :user-info="volunteer" />
    <view-layout :user-info="volunteer" />
  </div>
</template>

<script>
import ProfileHeader from '../../components/user-profile/profile-header.vue'
import ViewLayout from '../../components/user-profile/view-layout/view-layout.vue'
import { GET_VOLUNTEER_BY_ID } from '../../graphql'

export default {
  name: 'UserProfile',
  components: { ViewLayout, ProfileHeader },
  data: () => ({}),
  apollo: {
    // Should we save it to store?
    volunteer: {
      query: GET_VOLUNTEER_BY_ID,
      prefetch: ({ route }) => ({ id: route.params.id }),
      variables() {
        // TODO: remove hardcode
        return { input: { id: 'cl0ln0a8p00627llvqhmpl8zz' } }
      },
    },
  },
}
</script>
