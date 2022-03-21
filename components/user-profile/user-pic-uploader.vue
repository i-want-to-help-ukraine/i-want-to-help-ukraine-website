<template>
  <div>
    <div
      role="button"
      class="avatar-container border-gunsmoke bg-grey rounded-full overflow-hidden flex-shrink-0 relative"
      @click="openFileChooserWindow"
    >
      <img
        class="avatar"
        alt="Avatar"
        :width="avatarPreview.width"
        :height="avatarPreview.height"
        :src="userPicUrl"
      />
      <div
        class="avatar-overlay opacity-40 bg-gunsmoke absolute h-full w-full hidden left-0 top-0"
      />
      <img
        class="absolute camera-icon"
        width="80"
        height="80"
        :src="cameraIcon"
        alt="Choose photo"
      />
    </div>
    <modal name="avatar" width="364" height="auto">
      <div class="flex flex-col items-center p-8 bg-blue">
        <avatar-uploader
          v-model="croppa"
          class="border-2 border-marine rounded cursor-pointer"
          :accept="'image/*'"
          :show-remove-button="false"
          :width="avatarContainer.width"
          :height="avatarContainer.height"
          :placeholder-font-size="16"
          placeholder="Виберіть фото"
        />
        <div class="flex w-full mt-4">
          <custom-button
            class="flex-grow"
            variant="primary"
            @handleClick="generateImage"
          >
            Застосувати
          </custom-button>
          <custom-button
            class="flex-grow ml-2"
            variant="primary-outline"
            @handleClick="closeAvatarModal"
          >
            Скасувати
          </custom-button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { CustomButton } from '../UI/index.js'
import cameraIcon from '../../assets/icons/camera.svg'

export default {
  name: 'UserPic',
  ssr: false,
  components: { CustomButton },
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      croppa: null,
      userPicUrl: '',
      avatarContainer: {
        width: 300,
        height: 300,
      },
      avatarPreview: {
        width: 200,
        height: 200,
      },
    }
  },
  computed: {
    cameraIcon() {
      return cameraIcon
    },
  },
  mounted() {
    this.userPicUrl = this.src
  },
  methods: {
    async generateImage() {
      try {
        const result = this.croppa.generateDataUrl()
        if (result) {
          // Upload picture to Cloudinary.
          const uploadResult = await this.$cloudinary.upload(result, {
            upload_preset: process.env.CLOUDINARY_USER_AVATARS_PRESET_NAME,
          })
          if (uploadResult.error) throw new Error(uploadResult.error.message)
          this.userPicUrl = uploadResult.url
          this.$emit('onAvatarChange', this.userPicUrl)
          this.closeAvatarModal()
        }
      } catch (error) {
        console.error(`Avatar upload error: ${error.message}`)
      }
    },
    openFileChooserWindow() {
      this.openAvatarModal()
      // to make operation asynchronous
      setTimeout(() => {
        this.croppa.chooseFile()
      })
    },
    openAvatarModal() {
      this.$modal.show('avatar')
    },
    closeAvatarModal() {
      this.$modal.hide('avatar')
    },
  },
}
</script>

<style>
.camera-icon {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar-container:hover > .avatar-overlay,
.avatar-container:hover .camera-icon {
  opacity: 0.5;
}

.avatar-container:hover > .avatar-overlay {
  mix-blend-mode: multiply;
}
</style>
