<template>
  <div
    class="relative top-0 flex flex-col lg:flex-row items-center justify-between px-2 lg:px-16 py-6 w-full"
  >
    <div class="flex flex-col sm:flex-row justify-between items-center z-20">
      <nuxt-link to="/">
        <img
          class="mr-2"
          width="240"
          alt="VolunteersUA"
          src="https://res.cloudinary.com/volunteersua/image/upload/v1648925180/logo/volunteers-ua-horizontal_wq93oo.svg"
        />
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
            v-if="authorized ? !!token : true"
            class="text-sm sm:text-md text-marine font-medium mr-4 sm:mr-16 cursor-pointer"
            :to="path"
            @click="redirect(path)"
            @keydown="redirect(path)"
          >
            {{ label }}
          </span>
        </li>
        <li v-if="token" class="mr-4 sm:mr-16 py-2">
          <nuxt-link
            :to="`/edit-profile`"
            class="text-sm sm:text-md text-marine font-medium"
            >Profile</nuxt-link
          >
        </li>
      </ul>
      <custom-button v-if="!token" variant="secondary" @handleClick="onLogin">
        Become a volunteer
      </custom-button>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState({
      token: ({ auth }) => auth.authUser?.accessToken,
    }),
  },
  methods: {
    onLogin() {
      this.$router.push('/sign-in')
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
