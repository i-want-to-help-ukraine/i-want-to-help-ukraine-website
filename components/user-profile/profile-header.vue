<template>
  <div class="flex py-2">
    <user-pic :image="userInfo.userPic" />
    <div class="flex flex-col justify-center items-start ml-8">
      <div class="flex items-center">
        <h1 class="text-4xl mb-2">
          {{ userInfo.firstName }} {{ userInfo.lastName }}
        </h1>
        <account-status :value="userInfo.status" class="ml-2" />
      </div>
      <button
        class="mt-2 text-base bg-white border-2 text-black font-medium rounded px-4"
        @click="handleClickEdit"
      >
        {{ !profile.isProfileEditing ? 'Edit profile' : 'Cancel editing' }}
      </button>
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
  computed: mapState(['profile']),
  methods: {
    handleClickEdit() {
      this.$store.dispatch(
        'profile/setIsProfileEditing',
        !this.profile.isProfileEditing
      )
    },
  },
}
</script>
