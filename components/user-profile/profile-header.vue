<template>
  <div
    class="bg-white flex justify-center items-start w-full py-10 px-8 mx-8 rounded rounded-b-3xl"
  >
    <div
      v-if="editable"
      class="flex flex-col sm:flex-row items-center rounded w-full max-w-[1000px]"
    >
      <user-pic-uploader
        :src="userInfo.avatarUrl"
        @onAvatarChange="onAvatarChange"
      />
      <div
        class="flex flex-col sm:flex-row items-center sm:items-start justify-between mt-2 sm:mt-0 sm:ml-8 w-full"
      >
        <div class="flex flex-col items-center sm:items-start">
          <h1 class="text-4xl my-3 text-center">
            {{ userInfo.firstName }} {{ userInfo.lastName }}
          </h1>
          <account-status
            :value="userInfo.verificationStatus"
            class="mr-2 w-max"
          />
        </div>
        <div class="flex flex-col items-center sm:items-end">
          <profile-header-button
            v-if="userInfo.id"
            :visible="!!userInfo"
            :path="`/user-profile/${userInfo.id}`"
            class="mt-6 sm:mt-0 ml-1"
          >
            View profile
          </profile-header-button>
          <profile-header-button
            class="mt-4 sm:mt-0"
            @handleClick="handleClickLogout"
          >
            Logout
          </profile-header-button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col sm:flex-row py-2 w-full max-w-[1000px] rounded rounded-b-4xl"
    >
      <user-pic :src="userInfo.avatarUrl" />
      <div class="flex flex-col justify-center sm:ml-8 mt-3 sm:mt-0">
        <div
          class="flex sm:block flex-col justify-center text-center sm:text-left"
        >
          <h1 class="text-4xl">
            {{ userInfo.firstName }} {{ userInfo.lastName }}
          </h1>
          <span class="mt-2 ml-1">{{ userInfo.organization }} </span>
        </div>
        <div class="flex mt-2 flex-wrap justify-center sm:justify-start">
          <profile-tag
            v-for="city in userInfo.cities"
            :key="city.id"
            type="city"
            class="m-1"
          >
            {{ city.title }}
          </profile-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import accountStatus from './account-status.vue'
import ProfileTag from './profile-tag.vue'
import UserPicUploader from './user-pic-uploader.vue'
import UserPic from './user-pic.vue'
import ProfileHeaderButton from './view-layout/profile-header-button.vue'
export default {
  name: 'ProfileHeader',
  components: {
    ProfileHeaderButton,
    accountStatus,
    UserPicUploader,
    UserPic,
    ProfileTag,
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
    showProfileButtons: {
      type: Boolean,
      default: false,
    },
    editable: {
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
    onAvatarChange(imageBase64) {
      this.$store.dispatch('auth/setUserAvatarBase64', imageBase64)
    },
  },
}
</script>
