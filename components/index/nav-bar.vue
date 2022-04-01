<template>
  <div
    class="bg-[#fff] relative top-0 flex flex-col lg:flex-row items-center justify-between px-2 lg:px-16 py-7 relative"
  >
    <div class="flex flex-col sm:flex-row justify-between items-center z-20">
      <nuxt-link to="/">
        <h1
          class="m-0 text-xl sm:text-3xl font-semibold sm:text-2xl mr-4 capitalize text-center text-gunsmoke"
        >
          🇺🇦 VolunteersUA
        </h1>
      </nuxt-link>
      <burger-button
        class="md:hidden sm:absolute right-5 top-1/2 sm:translate-y-[-50%] z-30 mt-4 sm:mt-0"
        :is-active="menuIsOpen"
        @onClick="toggleMenu"
      />
      <burger-menu class="md:hidden" :open="menuIsOpen" @onClose="toggleMenu" />
    </div>
    <nav class="w-max mt-2 sm:mt-4 lg:mt-0 flex-col sm:flex-row hidden md:flex">
      <ul class="flex items-center mb-2 sm:mb-4 sm:mb-0">
        <li
          v-for="{ path, label, authorized } in links"
          :key="path"
          class="py-2"
        >
          <span
            v-if="authorized ? isAuthorized || authCookiePresent : true"
            class="text-sm sm:text-md text-marine font-medium mr-4 sm:mr-16 cursor-pointer"
            :to="path"
            @click="redirect(path)"
            @keydown="redirect(path)"
          >
            {{ label }}
          </span>
        </li>
        <li v-if="isAuthorized || authCookiePresent" class="mr-4 sm:mr-16 py-2">
          <nuxt-link
            :to="`/edit-profile`"
            class="text-sm sm:text-md text-marine font-medium"
            >Profile</nuxt-link
          >
        </li>
      </ul>
      <custom-button
        v-if="!isAuthorized && !authCookiePresent"
        variant="secondary"
        @handleClick="onLogin"
      >
        Become a volunteer
      </custom-button>
    </nav>
  </div>
</template>

<script>
import { authCookiePresent } from '../../utils/auth'
import { CustomButton } from '../UI'
import { BurgerMenu, BurgerButton } from '../UI/nav-menu'

export default {
  name: 'NavBar',
  components: { CustomButton, BurgerMenu, BurgerButton },
  data: () => ({
    links: [
      {
        path: '/about-us',
        label: 'About Us',
      },
      {
        path: '/how-to-help',
        label: 'How to help?',
      },
      // {
      //   path: '/support',
      //   label: 'Support',
      // },
      {
        path: '/how-to-fundrise',
        label: 'Як отримуваті гроші?',
        authorized: true,
      },
    ],
    menuIsOpen: false,
  }),
  computed: {
    isAuthorized() {
      return this.$store.getters['auth/isAuthorized']
    },
    authCookiePresent() {
      return authCookiePresent()
    },
  },
  methods: {
    onLogin() {
      this.$router.push('/edit-profile')
    },
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen
    },
    redirect(path) {
      this.$router.push(path)
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
