<template>
  <div v-if="userInfo" class="lg:grid lg:grid-cols-3 sm:gap-5 my-8">
    <profile-container class="col-span-2">
      <main-info :user-info="userInfo" />
    </profile-container>
    <profile-container class="col-span-1">
      <social-info
        v-if="userInfo.social && userInfo.social.length > 0"
        :user-info="userInfo.social"
      />
    </profile-container>
    <profile-container class="col-span-1">
      <activity-info
        v-if="userInfo.activities && userInfo.activities.length > 0"
        :values="userInfo.activities"
      />
    </profile-container>
    <profile-container class="col-span-3">
      <payment-info :payments="userInfo.payments" />
    </profile-container>
  </div>
</template>

<script>
import ProfileContainer from '../profile-container.vue'
import SocialInfo from './social-info.vue'
import ActivityInfo from './activity-info.vue'
import MainInfo from './main-info.vue'
import PaymentInfo from './payment-info.vue'

export default {
  name: 'ViewLayout',
  components: {
    ProfileContainer,
    MainInfo,
    SocialInfo,
    ActivityInfo,
    PaymentInfo,
  },
  props: {
    userInfo: {
      type: Object,
      default: () => ({
        userPic: '',
        firstName: '',
        lastName: '',
        status: '',
      }),
    },
  },
}
</script>
