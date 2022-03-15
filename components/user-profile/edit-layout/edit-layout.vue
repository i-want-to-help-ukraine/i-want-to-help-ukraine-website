<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid sm:grid-cols-2 gap-10 my-8">
      <profile-container>
        <user-info
          :default-values="userData"
          :schema="fieldSchema.main"
          @handleChange="handleChange"
        />
      </profile-container>
      <div>
        <profile-container>
          <social-info
            :default-values="userData.social"
            :schema="fieldSchema.social"
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
      <custom-button @handleClick="handleCancel">Cancel </custom-button>
      <custom-button type="submit" @handleClick="handleSubmit">
        Save
      </custom-button>
    </div>
  </form>
</template>

<script>
// import VueSelect from 'nuxt-vue-select'
import ProfileContainer from '../profile-container.vue'
import CustomButton from '../../UI/custom-button.vue'
import TextArea from '../../UI/text-area.vue'
import TextInput from '../../UI/text-input.vue'
import { GET_ACTIVITIES } from '../../../graphql'
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
  apollo: {
    activities: {
      query: GET_ACTIVITIES,
      prefetch: true,
    },
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formData: {},
      fieldSchema: {
        main: [
          {
            name: 'firstName',
            label: 'First Name',
            component: TextInput,
            // options: {
            //   propsData: {
            //     value: this.userData.userInfo.firstName,
            //   },
            //   listeners: { onInput: (value) => (this.userData.userInfo.firstName = value) },
            // }
          },
          {
            name: 'lastName',
            label: 'Last Name',
            component: TextInput,
          },
          // {
          //   name: 'email',
          //   label: 'Email',
          //   component: TextInput,
          // },
          // {
          //   name: 'phone',
          //   label: 'Phone',
          //   component: TextInput,
          // },
          // {
          //   name: 'organisation',
          //   label: 'Organisation',
          //   component: TextInput,
          // },
          // {
          //   name: 'activities',
          //   label: 'Activities',
          //   component: VueSelect,
          // },
          {
            name: 'description',
            label: 'Description',
            component: TextArea,
          },
        ],
        social: [
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
    }
  },
  beforeMount() {
    this.formData = { ...this.user }
  },
  methods: {
    handleSubmit() {
      // const CreateVolunteerInput = {
      //   name: this.formData.name,
      //   citiesIds: this.formData.citiesIds,
      //   // activitiesIds: this.formData.activitiesIds,F
      //   social: this.formData.social,
      //   paymentOptions: this.formData.paymentOptions,
      // }
      // if (this.user) {
      //   // TODO: update user in our DB
      //   return
      // }
      // // TODO: save user to our DB
      // console.log({
      //   formData: this.formData,
      // })
    },
    handleChange(value) {
      this.formData = { ...this.formData, ...value }
    },
  },
}
</script>
