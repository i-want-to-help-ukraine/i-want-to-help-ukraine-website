<template>
  <div
    class="bg-[#fff] sticky top-0 flex flex-col lg:flex-row items-center justify-between px-2 lg:px-16 py-7"
  >
    <nuxt-link to="/">
      <h1
        class="m-0 text-xl sm:text-3xl font-semibold sm:text-2xl mr-4 capitalize text-center text-gunsmoke"
      >
        🇺🇦 How To Help Ukraine
      </h1>
    </nuxt-link>

    <nav class="w-max mt-2 sm:mt-4 lg:mt-0 flex flex-col sm:flex-row">
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
        <li v-if="isAuthenticated" class="mr-4 sm:mr-16 py-2">
          <nuxt-link
            :to="`/edit-profile`"
            class="text-sm sm:text-md text-marine font-medium"
            >Profile</nuxt-link
          >
        </li>
      </ul>
      <custom-button
        v-if="!isAuthenticated"
        type="secondary"
        @handleClick="onLogin"
      >
        Become a volunteer
      </custom-button>
    </nav>
  </div>
</template>

<script>
import customButton from '../UI/custom-button.vue'
export default {
  name: 'NavBar',
  components: { customButton },
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
  }),
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
  methods: {
    onLogin() {
      this.$router.push('/edit-profile')
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
