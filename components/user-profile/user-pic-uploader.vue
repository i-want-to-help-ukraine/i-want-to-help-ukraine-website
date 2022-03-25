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
        :src="userPicUrl || noAvatarImage"
      />
      <img
        class="absolute camera-icon opacity-0 hover:opacity-50 duration-150"
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
import noAvatarImage from '../../assets/img/no-avatar.svg'

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
  },
  mounted() {
    this.userPicUrl = this.src
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
</style>
