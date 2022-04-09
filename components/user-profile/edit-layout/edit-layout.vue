<template>
  <div class="">
    <form
      v-if="auth.authUser"
      @submit="handleSubmit"
      class="max-w-[1000px] mx-auto"
    >
      <div class="sm:grid grid-cols-3 gap-4 sm:gap-10 my-8">
        <div class="col-span-2 flex flex-col">
          <profile-container>
            <user-info :errors="errors" />
          </profile-container>
          <profile-container>
            <cities-info :errors="errors" class="mb-8" />
            <activity-info :errors="errors" />
          </profile-container>
        </div>
        <div class="col-span-1 flex flex-col justify-start">
          <profile-container>
            <contact-info :errors="errors" />
          </profile-container>
          <profile-container>
            <social-info :errors="errors" />
          </profile-container>
          <profile-container>
            <payment-info :errors="errors" />
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
    <success-modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileContainer from '../profile-container.vue'
import { CustomButton } from '../../UI'
import { editProfileSchema } from '../../../utils/formSchemas'
import { buildUploadAvatarParams } from '../../../utils/cloudinary'
import { CREATE_PROFILE, UPDATE_PROFILE } from '../../../graphql'

import {
  PaymentInfo,
  SocialInfo,
  UserInfo,
  ContactInfo,
  ActivityInfo,
  CitiesInfo,
} from '.'
import SuccessModal from './success-modal.vue'

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
    SuccessModal,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState({
      userForm: ({ auth }) => auth.userForm,
      user: ({ auth }) => auth.user,
      userAvatarBase64: ({ auth }) => auth.userAvatarBase64,
      auth: ({ auth }) => auth,
      errors: ({ auth }) => auth.formErrors,
    }),
  },
  methods: {
    async handleSubmit(evt) {
      evt.preventDefault()

      const isValid = this.validation()
      if (!isValid) return false

      const avatarUrl = this.userAvatarBase64
        ? await this.uploadUserAvatar()
        : this.userForm.avatarUrl

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
      } = this.userForm

      if (!this.user.id) {
        const CreateVolunteerInput = {
          activityIds: getIds(activities),
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
          avatarUrl,
        }

        return this.createProfile(CreateVolunteerInput)
      }

      const toCreate = (newArray) => newArray?.filter((item) => !item.id)

      const toDelete = (oldArray, newArray) =>
        oldArray?.filter(({ id }) => !newArray.find((item) => item?.id === id))

      const UpdateVolunteerInput = {
        activityIds: getIds(activities),
        cityIds: getIds(cities),
        contacts: {
          create: toCreate(contacts).map(({ provider, metadata }) => ({
            contactProviderId: provider.id,
            metadata,
          })),
          delete: toDelete(this.user.contacts, contacts).map(({ id }) => id),
        },
        paymentOptions: {
          create: toCreate(payments).map(({ provider, metadata }) => ({
            paymentProviderId: provider.id,
            metadata,
          })),
          delete: toDelete(this.user.payments, payments).map(({ id }) => id),
        },
        social: {
          create: toCreate(social).map(({ provider, url }) => ({
            socialProviderId: provider.id,
            url,
          })),
          delete: toDelete(this.user.social, social).map(({ id }) => id),
        },
        organization,
        description,
        firstName,
        lastName,
        avatarUrl,
      }

      return this.updateProfile(UpdateVolunteerInput)
    },
    /**
     * Upload picture to Cloudinary.
     */
    async uploadUserAvatar() {
      const params = buildUploadAvatarParams(this.auth.authUser.uid)
      try {
        const uploadResult = await this.$cloudinary.upload(
          this.userAvatarBase64,
          params
        )
        this.$store.dispatch('auth/setUserAvatarBase64', null)

        if (uploadResult.error) throw new Error(uploadResult.error.message)
        return uploadResult.url
      } catch (error) {
        return console.error(`Upload avatar error: ${error.message}`)
      }
    },
    createProfile(input) {
      return this.$apollo
        .mutate({
          mutation: CREATE_PROFILE,
          variables: {
            input,
          },
          context: {
            headers: {
              Authorization: `Bearer ${this.auth.authUser?.accessToken}`,
            },
          },
        })
        .then(({ data }) => {
          if (!data?.createProfile?.id) return false

          this.$store.dispatch('auth/setUser', data.createProfile)
          if (this.user.status === 'requested') this.$modal.show('success')
          return true
        })
    },
    updateProfile(input) {
      return this.$apollo
        .mutate({
          mutation: UPDATE_PROFILE,
          variables: {
            input,
          },
          context: {
            headers: {
              Authorization: `Bearer ${this.auth.authUser?.accessToken}`,
            },
          },
        })
        .then(({ data }) => {
          if (!data?.updateProfile?.id) return false

          this.$store.dispatch('auth/setUser', data.updateProfile)
          this.$router.push(`/user-profile/${data?.updateProfile?.id}`)
          return true
        })
    },
    handleCancel() {
      this.$router.push('/')
    },
    validation() {
      const dataArray = Object.entries({
        ...this.userForm,
        avatarUrl: this.userAvatarBase64 || this.userForm.avatarUrl,
      })

      const isValid = () => {
        const errorsArray = Object.values(this.errors)
        const result = errorsArray.reduce((prev, cur) => prev || !!cur, false)

        return !result
      }

      dataArray.forEach(([key, value]) => {
        const schema = editProfileSchema[key]

        if (!schema) return false
        if (schema.required) {
          if (!value || !value.length)
            this.$store.dispatch('auth/setFormErrors', {
              [key]: 'This field is required',
            })
          else this.$store.dispatch('auth/setFormErrors', { [key]: '' })
          return false
        }
        if (!schema.rule) return false

        const result = schema.rule(value)

        return this.$store.dispatch('auth/setFormErrors', { ...result })
      })

      return isValid()
    },
  },
}
</script>
