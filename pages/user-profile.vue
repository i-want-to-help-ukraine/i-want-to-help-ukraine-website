<template>
  <p>Profile</p>
</template>

<script>
export default {
  name: 'UserProfile',
  mounted() {
    const { path } = this.$route
    this.$store.dispatch('user/saveUser')
    this.$router.replace(path)
  },
}
</script>
