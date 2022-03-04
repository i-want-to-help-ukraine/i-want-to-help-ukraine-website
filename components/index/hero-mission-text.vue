<template>
  <p>
    <img
      :src="require(`@/assets/img/${imageName}`)"
      :alt="`${imageAlt}`"
      class="logo"
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

<style scoped>
.logo {
  max-width: 20px;
}
</style>
