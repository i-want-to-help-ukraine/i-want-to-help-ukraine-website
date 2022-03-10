<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid sm:grid-cols-2 gap-10 my-8">
      <profile-container>
        <user-info
          :default-values="userData.userInfo"
          :schema="fieldSchema.userInfo"
          @handleChange="handleChange"
        />
      </profile-container>
      <div>
        <profile-container>
          <social-info
            :default-values="userData.socialInfo"
            :schema="fieldSchema.socialInfo"
            @handleChange="handleChange"
          />
        </profile-container>
        <profile-container>
          <payment-info
            :default-values="userData.paymentInfo"
            :schema="fieldSchema.paymentInfo"
            @handleChange="handleChange"
          />
        </profile-container>
      </div>
    </div>
    <div class="flex justify-end">
      <custom-button @onClick="handleCancel"> Cancel </custom-button>
      <custom-button type="submit"> Save </custom-button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import ProfileContainer from '../profile-container.vue'
import CustomButton from '../../UI/custom-button.vue'
import TextArea from '../../UI/text-area.vue'
import TextInput from '../../UI/text-input.vue'
import PaymentInfo from './payment-info-edit.vue'
import SocialInfo from './social-info-edit.vue'
import UserInfo from './user-info-edit.vue'

export default {
  name: 'EditLayout',
  components: {
    UserInfo,
    SocialInfo,
    PaymentInfo,
    ProfileContainer,
    CustomButton,
  },
  data: () => ({
    formData: {
      userInfo: {
        firstName: 'Volodymyr',
        lastName: 'Zelenskyi',
        status: 'requested',
        email: 'volodymyr.zelenskyi@mail.com',
      },
      socialInfo: {
        facebook: 'fb.com',
        instagram: 'insta.com',
      },
      paymentInfo: {},
    },
    fieldSchema: {
      userInfo: [
        {
          name: 'firstName',
          label: 'First Name',
          component: TextInput,
        },
        {
          name: 'lastName',
          label: 'Last Name',
          component: TextInput,
        },
        {
          name: 'email',
          label: 'Email',
          component: TextInput,
        },
        {
          name: 'phone',
          label: 'Phone',
          component: TextInput,
        },
        {
          name: 'organisation',
          label: 'Organisation',
          component: TextInput,
        },
        {
          name: 'description',
          label: 'Description',
          component: TextArea,
        },
      ],
      socialInfo: [
        {
          name: 'facebook',
          label: 'Facebook',
          component: TextInput,
        },
        {
          name: 'instagram',
          label: 'Instagram',
          component: TextInput,
        },
      ],
      paymentInfo: [
        {
          name: 'card',
          label: 'Card',
          component: TextInput,
        },
        {
          name: 'paypal',
          label: 'Paypal',
          component: TextInput,
        },
        {
          name: 'sendpay',
          label: 'SendPay',
          component: TextInput,
        },
      ],
    },
  }),
  computed: mapState({
    userData: ({ auth }) => auth.userData,
    user: ({ auth }) => auth.user,
  }),
  beforeMount() {
    this.formData = { ...this.auth?.userData }
  },
  methods: {
    handleSubmit() {
      if (this.user) {
        // TODO: update user in our DB
        return
      }
      // TODO: save user to our DB

      console.log({
        formData: this.formData,
      })
    },
    handleChange(value) {
      this.formData = { ...this.formData, ...value }
    },
    handleCancel() {
      this.$store.dispatch('profile/setIsProfileEditing', false)
    },
  },
}
</script>
