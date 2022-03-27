<template>
  <div
    class="bg-[#fff] relative top-0 flex flex-col lg:flex-row items-center justify-between px-2 lg:px-16 py-7 relative"
  >
    <div class="flex flex-col sm:flex-row justify-between items-center z-20">
      <nuxt-link to="/">
        <h1
          class="m-0 text-xl sm:text-3xl font-semibold sm:text-2xl mr-4 capitalize text-center text-gunsmoke"
        >
          🇺🇦 How To Help Ukraine
        </h1>
      </nuxt-link>
      <burger-button
        class="md:hidden sm:absolute right-5 top-1/2 sm:translate-y-[-50%] z-30 mt-2 sm:mt-0"
        @onClick="toggleMenu"
      />
      <burger-menu class="md:hidden" :open="menuIsOpen" />
    </div>
    <nav class="w-max mt-2 sm:mt-4 lg:mt-0 flex-col sm:flex-row hidden md:flex">
      <ul class="flex items-center mb-2 sm:mb-4 sm:mb-0">
        <li
          v-for="{ path, label } in links"
          :key="path"
          class="mr-4 sm:mr-16 py-2"
        >
          <nuxt-link
            :to="path"
            class="text-sm sm:text-md text-marine font-medium"
            >{{ label }}</nuxt-link
          >
        </li>
        <li v-if="isAuthorized" class="mr-4 sm:mr-16 py-2">
          <nuxt-link
            :to="`/edit-profile`"
            class="text-sm sm:text-md text-marine font-medium"
            >Profile</nuxt-link
          >
        </li>
      </ul>
      <custom-button
        v-if="!isAuthorized"
        variant="secondary"
        @handleClick="onLogin"
      >
        Become a volunteer
      </custom-button>
    </nav>
  </div>
</template>

<script>
import { CustomButton } from '../UI/index.js'
import { BurgerMenu, BurgerButton } from '../UI/nav-menu'
export default {
  name: 'NavBar',
  components: { CustomButton, BurgerMenu, BurgerButton },
  data: () => ({
    links: [
      {
        path: '/how-it-works',
        label: 'How it works?',
      },
      {
        path: '/donate',
        label: 'How to donate?',
      },
      {
        path: '/supporters',
        label: 'Supporters',
      },
    ],
    menuIsOpen: false,
  }),
  computed: {
    isAuthorized() {
      return this.$store.getters['auth/isAuthorized']
    },
  },
  methods: {
    onLogin() {
      this.$router.push('/edit-profile')
    },
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen
    },
  },
}
</script>

<style scoped>
.title-text {
  background: #005bc2;
  background: linear-gradient(to right, #005bc2 20%, #ffd400 80%);
  background: linear-gradient(to right, #005bc2 20%, #ffd400 80%);
  background: linear-gradient(to right, #005bc2 20%, #ffd400 80%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
