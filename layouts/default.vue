<template>
  <div class="font-sans default bg-blue h-full w-full table">
    <div class="bg-[#fff]">
      <nav-bar class="mx-auto max-w-[1800px]" />
    </div>
    <div class="table-row h-[100%]">
      <Nuxt />
    </div>
    <div class="mx-auto">
      <footer-component />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FooterComponent from '../components/home/layout/footer-component.vue'
import NavBar from '../components/home/layout/nav-bar.vue'

export default {
  name: 'DefaultLayout',
  components: { NavBar, FooterComponent },
  computed: {
    ...mapState({
      auth: ({ auth }) => auth,
    }),
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

.default {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
}

html,
body {
  height: 100%;
}

#__nuxt,
#__layout {
  height: 100%;
}

a {
  color: #6dacf6;
}

a:hover {
  color: #fadc3e;
}
</style>
