<template>
  <div>
    <div
      role="button"
      class="avatar-container rounded-full overflow-hidden flex-shrink-0 relative"
      @click="openFileChooserWindow"
    >
      <img
        class="avatar"
        alt="Avatar"
        :width="avatarContainer.width"
        :height="avatarContainer.height"
        :src="userPicUrl"
      />
      <div
        class="flex items-center justify-center avatar-overlay opacity-40 bg-gunsmoke absolute h-full w-full hidden left-0 top-0"
      />
      <img
        class="absolute hidden camera-icon opacity-50"
        width="80"
        height="80"
        :src="cameraIcon"
        alt="Choose photo"
      />
    </div>
    <avatar-uploader
      v-model="croppa"
      :accept="'image/*'"
      :width="avatarContainer.width"
      :height="avatarContainer.height"
      :placeholder-font-size="16"
      placeholder="Choose photo"
    />
    <button @click="generateImage">Generate</button>
  </div>
</template>

<script>
import cameraIcon from '../../assets/icons/camera.svg'

export default {
  name: 'UserPic',
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
        width: 200,
        height: 200,
      },
      showUploadComponent: false,
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
    generateImage() {
      const url = this.croppa.generateDataUrl()
      if (url) {
        console.log(url, this.croppa)
      }
      this.userPicUrl = url
    },
    openFileChooserWindow() {
      const file = this.croppa.chooseFile()
      console.log(file, 'file')
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
  display: block;
}

.avatar-container:hover > .avatar-overlay {
  mix-blend-mode: multiply;
}
</style>
