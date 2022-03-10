<template>
  <p class="my-2 flex xl:flex-row items-center">
    <img
      :src="require(`@/assets/img/${imageName}`)"
      :alt="`${imageAlt}`"
      class="logo mr-2 w-4 xl:w-8"
    />
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'HeroMissionText',
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
