<template>
  <div class="h-screen w-screen flex items-center">
    <custom-loader />
  </div>
</template>

<script>
import { CustomLoader } from '../components/UI/index.js'

export default {
  name: 'AuthCallback',
  components: { CustomLoader },
  layout: 'empty',
  mounted() {
    this.$router.push('/edit-profile')
  },
}
</script>
