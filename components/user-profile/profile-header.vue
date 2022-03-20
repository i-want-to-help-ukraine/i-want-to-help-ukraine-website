<template>
  <div class="flex py-2">
    <!-- TODO: remove hardcode -->
    <user-pic :src="userInfo.avatarUrl" />
    <div class="flex flex-col justify-center items-start ml-8">
      <div class="flex items-center">
        <h1 class="text-4xl mb-2">
          {{ userInfo.firstName }} {{ userInfo.lastName }}
        </h1>
        <account-status :value="userInfo.verificationStatus" class="ml-2" />
      </div>
      <div v-if="showProfileButtons" class="flex flex-row mt-2">
        <button
          v-if="user"
          class="text-base bg-white border-2 text-black font-medium rounded px-4 mr-2"
          @click="handleClickView"
        >
          View profile
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
import accountStatus from './account-status.vue'
import UserPic from './user-pic.vue'
export default {
  name: 'ProfileHeader',
  components: { accountStatus, UserPic },
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
    showProfileButtons: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClickView() {
      if (this.userInfo) this.$router.push(`/user-profile/${this.userInfo.id}`)
    },
    handleClickLogout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
