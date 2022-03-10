<template>
  <div class="flex py-2">
    <user-pic :image="userInfo.userPic" />
    <div class="flex flex-col justify-center items-start ml-8">
      <div class="flex items-center">
        <h1 class="text-4xl mb-2">
          {{ userInfo.firstName }} {{ userInfo.lastName }}
        </h1>
        <account-status
          v-if="auth.user"
          :value="userInfo.status"
          class="ml-2"
        />
      </div>
      <div class="flex flex-row mt-2">
        <button
          v-if="auth.user"
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
  },
  computed: mapState(['profile', 'auth']),
  methods: {
    handleClickView() {
      const { user } = this.auth
      if (user) this.$router.push(`/user-profile/${user.id}`)
    },
    handleClickLogout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
