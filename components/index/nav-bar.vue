<template>
  <div
    class="bg-white sticky top-0 flex flex-col lg:flex-row items-center justify-between px-4 py-4 shadow"
  >
    <nuxt-link to="/">
      <h1
        class="m-0 title text-xl sm:text-3xl sm:text-4xl title-text mr-4 uppercase text-center"
      >
        I Want To Help Ukraine
      </h1>
    </nuxt-link>

    <nav class="w-max mt-2 sm:mt-4 lg:mt-0 flex flex-col sm:flex-row">
      <ul class="flex items-center mb-2 sm:mb-4 sm:mb-0">
        <li
          v-for="({ path, label }, index) in links"
          :key="path"
          :class="[index + 1 < links.length && 'mr-4', 'sm:mr-4 py-2']"
        >
          <nuxt-link :to="path" class="text-sm sm:text-base">{{
            label
          }}</nuxt-link>
        </li>
      </ul>
      <button
        class="bg-blue-600 px-4 py-2 rounded text-white h-full text-sm sm:text-base"
        @click="onRegister"
      >
        Become a volunteer
      </button>
    </nav>
  </div>
</template>

<script>
import auth0 from '../../utils/auth0'
export default {
  name: 'NavBar',
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
  methods: {
    async onRegister() {
      await auth0.loginWithRedirect({
        redirect_uri: `http://localhost:3000/user-profile`,
      })
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
