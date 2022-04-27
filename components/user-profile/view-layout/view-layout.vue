<template>
  <div
    v-if="userInfo"
    class="flex flex-col md:flex-row justify-between my-8 w-full px-8 xl:px-0"
  >
    <div class="md:w-2/3">
      <activity-info
        v-if="userInfo.activities && userInfo.activities.length > 0"
        :values="userInfo.activities"
      />
    </div>
    <div class="mt-8 md:mt-0 md:ml-8">
      <main-info :user-info="userInfo" class="mb-8" />
      <payment-info :payments="userInfo.payments" />
    </div>
  </div>
</template>

<script>
import ActivityInfo from './activity-info.vue'
import MainInfo from './main-info.vue'
import PaymentInfo from './payment-info.vue'

export default {
  name: 'ViewLayout',
  components: {
    MainInfo,
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
