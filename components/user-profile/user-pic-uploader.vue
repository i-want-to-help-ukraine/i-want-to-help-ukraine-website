<template>
  <div class="w-full flex justify-center">
    <div class="w-full">
      <div
        class="avatar-container border-gunsmoke relative w-full rounded-xl overflow-hidden max-w-[340px]"
        @click="openFileChooserWindow"
        @keydown="openFileChooserWindow"
      >
        <img
          class="avatar w-full h-full bg-grey"
          alt="Avatar"
          :width="avatarPreview.width"
          :height="avatarPreview.height"
          :src="userPicUrl || src || noAvatarImage"
        />
        <img
          class="absolute camera-icon opacity-0 hover:opacity-50 duration-150"
          width="80"
          height="80"
          :src="cameraIcon"
          alt="Choose photo"
        />
      </div>
      <error-message :error="errors && errors.avatarUrl" />
    </div>
    <modal name="avatar" width="100%" height="100%">
      <div class="bg-transparent mx-auto p-4">
        <div class="flex flex-col items-center p-4 sm:p-8 bg-blue border-box">
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
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CustomButton } from '../UI'
import cameraIcon from '../../assets/icons/camera.svg'
import noAvatarImage from '../../assets/img/no-avatar.svg'
import ErrorMessage from '../UI/error-message.vue'

export default {
  name: 'UserPic',
  ssr: false,
  components: { CustomButton, ErrorMessage },
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
        width: 250,
        height: 250,
      },
      avatarPreview: {
        width: 300,
        height: 300,
      },
    }
  },
  computed: {
    cameraIcon() {
      return cameraIcon
    },
    noAvatarImage() {
      return noAvatarImage
    },
    ...mapState({
      errors: ({ auth }) => auth.formErrors,
    }),
  },
  methods: {
    generateImage() {
      try {
        const result = this.croppa.generateDataUrl()
        if (result) {
          this.userPicUrl = result
          this.$emit('onAvatarChange', this.userPicUrl)
          this.closeAvatarModal()
        }
      } catch (error) {
        console.error(`Generate avatar error: ${error.message}`)
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

.vm--modal {
  height: 100%;
  background: transparent !important;
  box-shadow: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
