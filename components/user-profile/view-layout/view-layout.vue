<template>
  <div class="grid lg:grid-cols-2 sm:gap-10 my-8">
    <!-- <profile-container class="col-span-1"> -->
    <!-- <main-info :schema="fieldSchema.mainInfo" :values="userInfo.mainInfo" /> -->
    <!-- </profile-container> -->
    <div class="col-span-2">
      <profile-container>
        <social-info
          v-if="userInfo.social.length > 0"
          :values="userInfo.social"
        />
      </profile-container>
      <profile-container>
        <activity-info
          v-if="userInfo.activities.length > 0"
          :values="userInfo.activities"
        />
      </profile-container>
      <profile-container>
        <!-- <payment-info
          v-if="userInfo.paymentInfo"
          :schema="fieldSchema.paymentInfo"
          :values="userInfo.paymentInfo"
        /> -->
      </profile-container>
    </div>
  </div>
</template>

<script>
import ProfileContainer from '../profile-container.vue'
import SocialInfo from './social-info.vue'
import ActivityInfo from './activity-info.vue'
// import MainInfo from './main-info.vue'
// import PaymentInfo from './payment-info.vue'

export default {
  name: 'ViewLayout',
  components: {
    ProfileContainer,
    // MainInfo,
    SocialInfo,
    ActivityInfo,
    // PaymentInfo,
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
  data: () => ({
    // fieldSchema: {
    // mainInfo: [
    //   {
    //     name: 'email',
    //     label: 'Email',
    //   },
    //   {
    //     name: 'phone',
    //     label: 'Phone',
    //   },
    //   {
    //     name: 'organisation',
    //     label: 'Organisation',
    //   },
    //   {
    //     name: 'description',
    //     label: 'Description',
    //   },
    // ],
    // socialInfo: [
    //   {
    //     name: 'facebook',
    //     label: 'Facebook',
    //   },
    //   {
    //     name: 'instagram',
    //     label: 'Instagram',
    //   },
    // ],
    // paymentInfo: [
    //   {
    //     name: 'card',
    //     label: 'Card',
    //   },
    //   {
    //     name: 'paypal',
    //     label: 'Paypal',
    //   },
    //   {
    //     name: 'sendpay',
    //     label: 'SendPay',
    //   },
    // ],
    // },
  }),
}
</script>
