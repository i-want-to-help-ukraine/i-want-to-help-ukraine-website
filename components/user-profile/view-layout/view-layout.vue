<template>
  <div class="grid lg:grid-cols-3 sm:gap-10 my-8">
    <profile-container class="col-span-2">
      <user-info :schema="fieldSchema.userInfo" :values="userData.userInfo" />
    </profile-container>
    <div class="col-span-1">
      <profile-container>
        <social-info
          v-if="userData.socialInfo"
          :schema="fieldSchema.socialInfo"
          :values="userData.socialInfo"
        />
      </profile-container>
      <profile-container>
        <payment-info
          v-if="userData.paymentInfo"
          :schema="fieldSchema.paymentInfo"
          :values="userData.paymentInfo"
        />
      </profile-container>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileContainer from '../profile-container.vue'
import SocialInfo from './social-info.vue'
import UserInfo from './user-info.vue'
import PaymentInfo from './payment-info.vue'

export default {
  name: 'ViewLayout',
  components: {
    ProfileContainer,
    UserInfo,
    SocialInfo,
    PaymentInfo,
  },
  data: () => ({
    fieldSchema: {
      userInfo: [
        {
          name: 'email',
          label: 'Email',
        },
        {
          name: 'phone',
          label: 'Phone',
        },
        {
          name: 'organisation',
          label: 'Organisation',
        },
        {
          name: 'description',
          label: 'Description',
        },
      ],
      socialInfo: [
        {
          name: 'facebook',
          label: 'Facebook',
        },
        {
          name: 'instagram',
          label: 'Instagram',
        },
      ],
      paymentInfo: [
        {
          name: 'card',
          label: 'Card',
        },
        {
          name: 'paypal',
          label: 'Paypal',
        },
        {
          name: 'sendpay',
          label: 'SendPay',
        },
      ],
    },
  }),
  computed: mapState({
    userData: ({ auth }) => auth.userData,
  }),
}
</script>
