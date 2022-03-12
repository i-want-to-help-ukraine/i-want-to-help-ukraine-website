<template>
  <div class="flex py-2">
    <user-pic :image="userInfo.userPic" class="w-[200px] h-[200px]" />
    <div class="flex flex-col justify-center items-start ml-8">
      <div class="flex items-center">
        <h1 class="text-4xl mb-2">
          {{ userInfo.firstname }} {{ userInfo.firstname }}
        </h1>
        <account-status :value="userInfo.verificationStatus" class="ml-2" />
      </div>
      <div v-if="auth.user" class="flex flex-row mt-2">
        <button
          class="text-base bg-white border-2 text-black font-medium rounded px-4 mr-2"
          @click="handleClickEdit"
        >
          {{ !profile.isProfileEditing ? 'Edit profile' : 'Cancel editing' }}
        </button>
        <button
          class="text-base bg-red border-2 text-black font-medium rounded px-4"
          @click="handleClickLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import accountStatus from './account-status.vue'
import UserPic from './user-pic.vue'
export default {
  name: 'ProfileHeader',
  components: { accountStatus, UserPic },
  props: {
    userInfo: {
      type: Object,
      default: () => ({
        userPick: '',
        firstName: '',
        lastName: '',
        status: '',
      }),
    },
  },
  computed: mapState(['auth']),
  methods: {
    handleClickEdit() {
      this.$store.dispatch(
        'profile/setIsProfileEditing',
        !this.profile.isProfileEditing
      )
    },
    handleClickLogout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
