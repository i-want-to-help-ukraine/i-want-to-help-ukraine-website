<template>
  <div
    class="bg-white flex justify-center items-start w-full py-16 px-8 mx-8 rounded rounded-b-3xl"
  >
    <div v-if="editable" class="w-full max-w-[1000px]">
      <div class="flex flex-col sm:flex-row items-center rounded w-full">
        <user-pic-uploader
          :src="userInfo.avatarUrl"
          @onAvatarChange="onAvatarChange"
        />
        <div
          class="flex flex-col justify-center items-start sm:items-start mt-2 sm:mt-0 sm:ml-8 w-full"
        >
          <h1 class="text-4xl my-3 text-center">
            {{ userInfo.firstName }} {{ userInfo.lastName }}
          </h1>
          <account-status
            :value="userInfo.verificationStatus"
            class="mr-2 w-max"
          />
        </div>
      </div>
      <div class="flex flex-col items-center sm:items-start">
        <profile-header-button
          v-if="userInfo.id"
          :visible="!!userInfo"
          :path="`/user-profile/${userInfo.id}`"
          class="mt-6"
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

    <div
      v-else
      class="flex flex-col sm:flex-row py-2 w-full max-w-[1000px] rounded rounded-b-4xl items-center"
    >
      <user-pic
        :src="userInfo.avatarUrl"
        class="w-[300px] h-[300px] rounded-full z-10"
      />
      <div class="flex flex-col items-start sm:ml-8">
        <h1 class="text-4xl my-3 text-center capitalize">
          {{ userInfo.firstName }} {{ userInfo.lastName }}
        </h1>
        <div class="flex flex-wrap w-full">
          <profile-tag
            v-for="city in userInfo.cities"
            :key="city.id"
            class="mr-1 my-1"
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
