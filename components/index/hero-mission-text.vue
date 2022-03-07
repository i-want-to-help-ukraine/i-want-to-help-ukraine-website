<template>
  <p class="my-1 xl:p-2 flex xl:flex-col items-center xl:items-start">
    <img
      :src="require(`@/assets/img/${imageName}`)"
      :alt="`${imageAlt}`"
      class="logo mr-1 w-4 xl:w-8"
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
