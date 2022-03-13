<template>
  <span
    class="flex xl:flex-row items-center bg-[#fff] text-gunsmoke text-base md:text-medium rounded-xl py-4 px-5"
  >
    <flag-icon class="logo mr-2 w-4 xl:w-12 mr-3" :code="imageName" />
    {{ text }}
  </span>
</template>

<script>
import flagIcon from '../UI/flag-icon.vue'
export default {
  name: 'HeroMissionText',
  components: { flagIcon },
  props: {
    imageName: {
      type: String,
      default: '',
    },
    imageAlt: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
