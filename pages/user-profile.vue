<template>
  <p>Profile</p>
</template>

<script>
export default {
  name: 'UserProfile',
  mounted() {
    const { path } = this.$route
    this.$store.dispatch('user/fetchUser')
    this.$router.replace(path)
  },
}
</script>
