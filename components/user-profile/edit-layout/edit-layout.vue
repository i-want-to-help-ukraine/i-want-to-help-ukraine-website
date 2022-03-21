<template>
  <form @submit="handleSubmit">
    <div class="sm:grid grid-cols-3 gap-4 sm:gap-10 my-8">
      <div class="col-span-2 flex flex-col">
        <profile-container>
          <user-info
            :default-values="userData"
            :errors="errors"
            @handleChange="handleChange"
          />
        </profile-container>
        <profile-container>
          <cities-info
            :default-values="userData.cities"
            class="mb-8"
            @handleChange="handleChange"
          />
          <activity-info
            :default-values="userData.activities"
            @handleChange="handleChange"
          />
        </profile-container>
      </div>
      <div class="col-span-1 flex flex-col justify-start">
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
      <custom-button @handleClick="handleCancel">Cancel </custom-button>
      <custom-button class="ml-4" variant="primary" type="submit">
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
import {
  PaymentInfo,
  SocialInfo,
  UserInfo,
  ContactInfo,
  ActivityInfo,
  CitiesInfo,
} from '.'

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
    CitiesInfo,
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
    handleSubmit(evt) {
      evt.preventDefault()

      const getIds = (array) => array?.map(({ id }) => id)
      const {
        activities,
        cities,
        contacts,
        payments,
        social,
        organization,
        description,
        firstName,
        lastName,
      } = this.formData
      const { user } = this.auth

      const isValid = this.validation(this.formData)
      if (!isValid) return false

      if (!user.id) {
        const CreateVolunteerInput = {
          avatarUrl: user.avatarUrl,
          activityIds: getIds(activities),
          authId: this.auth.authId,
          cityIds: getIds(cities),
          contacts: contacts.map(({ provider, metadata }) => ({
            contactProviderId: provider.id,
            metadata,
          })),
          paymentOptions: payments.map(({ provider, metadata }) => ({
            paymentProviderId: provider.id,
            metadata,
          })),
          social: social.map(({ provider, url }) => ({
            socialProviderId: provider.id,
            url,
          })),
          organization,
          description,
          firstName,
          lastName,
        }

        return this.createProfile(CreateVolunteerInput)
      }

      const toCreate = (newArray) => newArray.filter((item) => !item.id)

      const toDelete = (oldArray, newArray) =>
        oldArray.filter(({ id }) => !newArray.find((item) => item?.id === id))

      const UpdateVolunteerInput = {
        avatarUrl: user.avatarUrl,
        activityIds: getIds(activities),
        cityIds: getIds(cities),
        contacts: {
          create: toCreate(contacts).map(({ provider, metadata }) => ({
            contactProviderId: provider.id,
            metadata,
          })),
          delete: toDelete(user.contacts, contacts).map(({ id }) => id),
        },
        paymentOptions: {
          create: toCreate(payments).map(({ provider, metadata }) => ({
            paymentProviderId: provider.id,
            metadata,
          })),
          delete: toDelete(user.payments, payments).map(({ id }) => id),
        },
        social: {
          create: toCreate(social).map(({ provider, url }) => ({
            socialProviderId: provider.id,
            url,
          })),
          delete: toDelete(user.social, social).map(({ id }) => id),
        },
        organization,
        description,
        firstName,
        lastName,
      }

      return this.updateProfile(UpdateVolunteerInput)
    },
    createProfile(input) {
      this.$apollo.mutate({
        mutation: CREATE_PROFILE,
        variables: {
          input,
        },
        context: {
          headers: {
            Authorization: this.auth.authId,
          },
        },
      })
    },
    updateProfile(input) {
      this.$apollo
        .mutate({
          mutation: UPDATE_PROFILE,
          variables: {
            input,
          },
          context: {
            headers: {
              Authorization: this.auth.authId,
            },
          },
        })
        .then((res) =>
          this.$router.push(`/user-profile/${res.data?.updateProfile?.id}`)
        )
    },
    handleChange(value) {
      this.formData = { ...this.formData, ...value }
    },
    handleCancel() {
      this.$router.push('/')
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

        if (!schema) return false

        if (schema.required && !value) {
          this.errors = { ...this.errors, [key]: 'This field is required' }
          return false
        }

        if (!schema.rule) return false

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
