<template>
  <div
    v-if="volunteer.id"
    class="sm:mx-auto w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10 py-8 px-4"
  >
    <div class="col-span-1">
      <user-pic :src="volunteer.avatarUrl" class="mx-auto rounded-xl z-10" />
      <h1 class="text-3xl my-3 capitalize">
        {{ volunteer.firstName }} {{ volunteer.lastName }}
      </h1>
      <city-chips :cities="volunteer.cities" class="mb-4" />
      <organization-info
        class="mb-4"
        v-if="volunteer.organization"
        :organization="volunteer.organization"
      />
      <activity-info
        v-if="volunteer.activities && volunteer.activities.length > 0"
        :values="volunteer.activities"
        class="mb-4"
      />
      <social-info
        v-if="volunteer.social && volunteer.social.length > 0"
        :user-info="volunteer.social"
      />
    </div>
    <div class="col-span-1 md:col-span-2">
      <main-info :user-info="volunteer" class="mb-8" />
      <payment-info :payments="volunteer.payments" />
    </div>
  </div>
  <div v-else class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CustomLoader } from '../../components/UI'

import UserPic from '../../components/user-profile/user-pic.vue'
import ActivityInfo from '../../components/user-profile/view-layout/activity-info.vue'
import CityChips from '../../components/user-profile/view-layout/city-chips.vue'
import MainInfo from '../../components/user-profile/view-layout/main-info.vue'
import OrganizationInfo from '../../components/user-profile/view-layout/organization-info.vue'
import PaymentInfo from '../../components/user-profile/view-layout/payment-info.vue'
import SocialInfo from '../../components/user-profile/view-layout/social-info.vue'

export default {
  name: 'UserProfile',
  components: {
    CustomLoader,
    ActivityInfo,
    MainInfo,
    PaymentInfo,
    UserPic,
    OrganizationInfo,
    CityChips,
    SocialInfo,
  },
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
