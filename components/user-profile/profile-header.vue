<template>
  <div class="flex py-2">
    <!-- <user-pic :src="userInfo.userPic" /> -->
    <!-- TODO: remove hardcode -->
    <user-pic src="https://kor.ill.in.ua/m/610x385/2715360.jpg" />
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
  computed: mapState({
    user: ({ auth }) => auth.user,
  }),
  methods: {
    handleClickView() {
      if (this.user) this.$router.push(`/user-profile/${this.user.id}`)
    },
    handleClickLogout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
