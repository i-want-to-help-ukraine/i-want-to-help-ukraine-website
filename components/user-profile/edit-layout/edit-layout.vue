<template>
  <form @submit.prevent="handleSubmit">
    <div class="sm:grid grid-cols-3 gap-4 sm:gap-10 my-8">
      <div class="col-span-2 flex flex-col justify-between">
        <profile-container>
          <user-info
            :default-values="userData"
            :errors="errors"
            @handleChange="handleChange"
          />
        </profile-container>
        <profile-container>
          <activity-info
            :default-values="userData.activities"
            @handleChange="handleChange"
          />
        </profile-container>
      </div>
      <div class="col-span-1 flex flex-col justify-between">
        <profile-container>
          <contact-info
            :default-values="userData.contacts"
            :errors="errors"
            @handleChange="handleChange"
          />
        </profile-container>
        <profile-container>
          <social-info
            :default-values="userData.social"
            :errors="errors"
            @handleChange="handleChange"
          />
        </profile-container>
        <profile-container>
          <payment-info
            :errors="errors"
            :default-values="userData.payments"
            @handleChange="handleChange"
          />
        </profile-container>
      </div>
    </div>
    <div class="flex justify-end">
      <custom-button class="mr-4" @handleClick="handleCancel"
        >Cancel
      </custom-button>
      <custom-button type="submit" @handleClick="handleSubmit">
        Save
      </custom-button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import ProfileContainer from '../profile-container.vue'
import { CustomButton } from '../../UI/index.js'
import { editProfileSchema } from '../../../utils/formSchemas'
import { CREATE_PROFILE, UPDATE_PROFILE } from '../../../graphql'
import { PaymentInfo, SocialInfo, UserInfo, ContactInfo, ActivityInfo } from '.'

export default {
  name: 'EditLayout',
  components: {
    UserInfo,
    SocialInfo,
    PaymentInfo,
    ProfileContainer,
    CustomButton,
    ContactInfo,
    ActivityInfo,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    formData: {},
    errors: {},
  }),
  computed: {
    ...mapState(['auth']),
  },
  beforeMount() {
    this.formData = { ...this.userData }
  },
  methods: {
    handleSubmit() {
      const getIds = (array) => array?.map(({ id }) => id)
      const { activities, cities, contacts, payments, social, ...other } =
        this.formData
      const { user } = this.auth

      const CreateVolunteerInput = {
        avatarUrl: '.',
        activityIds: getIds(activities),
        authId: this.auth.authId,
        cityIds: getIds(cities),
        contacts: contacts.map(({ provider, metadata }) => ({
          contactProviderId: provider.id,
          metadata,
        })),
        paymentsOptions: payments.map(({ provider, metadata }) => ({
          paymentProviderId: provider.id,
          metadata,
        })),
        social: social.map(({ provider, url }) => ({
          socialProviderId: provider.id,
          url,
        })),
        ...other,
      }
      const isValid = this.validation(this.formData)

      if (!isValid) return false
      if (!user.id) return this.createProfile(CreateVolunteerInput)
      return this.updateProfile(CreateVolunteerInput)
    },
    createProfile(input) {
      this.$apollo.mutate({
        mutation: CREATE_PROFILE,
        variables: {
          input,
        },
      })
    },
    updateProfile(input) {
      this.$apollo.mutate({
        mutation: UPDATE_PROFILE,
        variables: {
          input,
        },
      })
    },
    handleChange(value) {
      this.formData = { ...this.formData, ...value }
    },
    validation(data) {
      const dataArray = Object.entries(data)

      const isValid = () => {
        const errorsArray = Object.values(this.errors)
        const result = errorsArray.reduce((prev, cur) => prev || !!cur, false)

        return !result
      }

      dataArray.forEach(([key, value]) => {
        const schema = editProfileSchema[key]

        if (!schema || !schema.rule) return false

        if (schema.required && !value) {
          this.errors = { ...this.errors, [key]: 'This field is required' }
          return false
        }

        const result = schema.rule(value)

        this.errors = {
          ...this.errors,
          ...result,
        }
      })

      return isValid()
    },
  },
}
</script>
