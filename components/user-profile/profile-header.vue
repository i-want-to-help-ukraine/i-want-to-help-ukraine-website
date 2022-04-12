<template>
  <div
    class="flex justify-center items-start w-full md:py-8 sm:mx-8 rounded rounded-b-3xl sm:px-4"
  >
    <div v-if="editable" class="w-full max-w-[1000px]">
      <div class="flex flex-col sm:flex-row items-center rounded w-full p-4">
        <user-pic-uploader
          :src="userForm.avatarUrl || (user && user.avatarUrl)"
          @onAvatarChange="onAvatarChange"
        />
        <div
          class="flex flex-col justify-center items-center sm:items-start mt-2 sm:mt-0 sm:ml-8 w-full"
        >
          <h1 class="text-4xl my-3 text-center">
            {{ user.firstName }} {{ user.lastName }}
          </h1>
          <account-status :value="user.verificationStatus" class="mr-2 w-max" />
        </div>
      </div>
      <div class="flex flex-col items-center sm:items-start mt-4">
        <profile-header-button
          v-if="user.id"
          :visible="!!user"
          :path="`/user-profile/${user.id}`"
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
      v-else-if="volunteer"
      class="flex flex-col md:flex-row w-full max-w-[1000px] rounded-b-4xl items-center px-0 sm:px-4 xl:px-0"
    >
      <user-pic
        :src="volunteer.avatarUrl"
        class="w-full md:w-[300px] md:h-[300px] max-w-[420px] xs:rounded-xl z-10"
      />
      <div
        class="flex flex-col items-center md:items-start md:ml-8 mt-4 md:mt-0"
      >
        <h1
          class="text-3xl md:text-4xl my-3 text-center md:text-left capitalize"
        >
          {{ volunteer.firstName }} {{ volunteer.lastName }}
        </h1>
        <div class="flex flex-wrap justify-center md:justify-start w-full">
          <profile-tag
            v-for="city in volunteer.cities"
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
import { mapState } from 'vuex'
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
    showProfileButtons: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      user: ({ auth }) => auth.user,
      volunteer: ({ volunteers }) => volunteers.currentVolunteer,
      userForm: ({ auth }) => auth.userForm,
    }),
  },
  methods: {
    handleClickView() {
      this.$router.push(`/user-profile/${this.user.id}`)
    },
    handleClickLogout() {
      this.$store.dispatch('auth/logout')
    },
    onAvatarChange(imageBase64) {
      this.$store.dispatch('auth/handleChangeUserForm', {
        avatarUrl: imageBase64,
      })
    },
  },
}
</script>
