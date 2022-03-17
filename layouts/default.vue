<template>
  <div class="font-sans default bg-blue">
    <div class="block mb-5 mx-auto">
      <nav-bar class="mb-5" />
    </div>
    <Nuxt />
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from '../components/index/footer-component.vue'
import NavBar from '../components/index/nav-bar.vue'
import { PROTECTED_ROUTES } from '../utils/auth'

export default {
  name: 'DefaultLayout',
  components: { NavBar, FooterComponent },
  mounted() {
    this.authorize()
  },
  methods: {
    authorize() {
      const currentRoute = this.$route.name
      const onAuthErrorCallback = PROTECTED_ROUTES.includes(currentRoute)
        ? () => this.$store.dispatch('auth/login')
        : undefined
      this.$store.dispatch('auth/authorize', onAuthErrorCallback)
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

.default {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
}
</style>
