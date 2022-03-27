<template>
  <div class="font-sans default bg-blue">
    <div class="mx-auto">
      <nav-bar class="mb-2" />
    </div>
    <Nuxt />
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from '../components/index/footer-component.vue'
import NavBar from '../components/index/nav-bar.vue'

export default {
  name: 'DefaultLayout',
  components: { NavBar, FooterComponent },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

.default {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
}
</style>
