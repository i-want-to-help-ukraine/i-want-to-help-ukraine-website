<template>
  <div
    v-if="userInfo"
    class="flex flex-col md:flex-row justify-between my-8 px-4 w-full"
  >
    <div class="w-2/3">
      <main-info :user-info="userInfo" class="mb-8" />
      <activity-info
        v-if="userInfo.activities && userInfo.activities.length > 0"
        :values="userInfo.activities"
      />
    </div>
    <div class="mt-8 md:mt-0 md:ml-8">
      <contact-info :contacts="userInfo.contacts" class="mb-4" />
      <social-info
        v-if="userInfo.social && userInfo.social.length > 0"
        :user-info="userInfo.social"
        class="mb-8"
      />
      <payment-info :payments="userInfo.payments" />
    </div>
  </div>
</template>

<script>
import SocialInfo from './social-info.vue'
import ActivityInfo from './activity-info.vue'
import MainInfo from './main-info.vue'
import PaymentInfo from './payment-info.vue'
import ContactInfo from './contact-info.vue'

export default {
  name: 'ViewLayout',
  components: {
    MainInfo,
    SocialInfo,
    ActivityInfo,
    PaymentInfo,
    ContactInfo,
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
