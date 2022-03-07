<template>
  <div
    class="bg-white sticky top-0 flex flex-col lg:flex-row items-center justify-between px-4 py-2 shadow"
  >
    <nuxt-link to="/">
      <h1 class="m-0 title text-4xl title-text mr-4 uppercase">
        I Want To Help Ukraine
      </h1>
    </nuxt-link>

    <nav class="w-max mt-4 lg:mt-0">
      <ul class="flex items-center">
        <li v-for="{ path, label } in links" :key="path" class="mr-4">
          <nuxt-link :to="path">{{ label }}</nuxt-link>
        </li>
        <nuxt-link v-if="user" to="/user-profile"> Profile </nuxt-link>
        <button
          v-else
          class="bg-blue-600 px-4 py-2 rounded text-white"
          @click="onRegister"
        >
          Become a volunteer
        </button>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: mapState({
    user: ({ auth }) => auth.user,
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
