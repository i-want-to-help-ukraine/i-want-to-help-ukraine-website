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
          v-for="{ path, label } in links"
          :key="path"
          class="mr-4 sm:mr-4 py-2"
        >
          <nuxt-link :to="path" class="text-sm sm:text-base">{{
            label
          }}</nuxt-link>
        </li>
        <li v-if="user" class="mr-4 sm:mr-4 py-2">
          <nuxt-link :to="`/user-profile/${user.id}`">Profile</nuxt-link>
        </li>
        <button
          v-else
          class="bg-blue-600 px-4 py-2 rounded text-white h-full text-sm sm:text-base"
          @click="onLogin"
        >
          Become a volunteer
        </button>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    onLogin() {
      this.$store.dispatch('auth/login')
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
