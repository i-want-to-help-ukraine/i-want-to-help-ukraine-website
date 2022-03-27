<template>
  <div
    :class="`bg-marine fixed z-10 top-0 right-0 h-full w-full ${
      open || 'hidden'
    }`"
  >
    <div class="flex flex-col items-center justify-center p-2 w-full h-full">
      <menu-link v-if="isAuthorized" to="/edit-profile">Profile</menu-link>
      <div v-else class="mb-2">
        <custom-button variant="secondary" @handleClick="onLogin">
          Become a volunteer
        </custom-button>
      </div>
      <menu-link to="/how-to">How to Donate</menu-link>
      <menu-link to="/about-us">About Us</menu-link>
    </div>
  </div>
</template>

<script>
import CustomButton from '../custom-button.vue'
import MenuLink from './menu-link.vue'
export default {
  name: 'BurgerMenu',
  components: { MenuLink, CustomButton },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isAuthorized() {
      return this.$store.getters['auth/isAuthorized']
    },
  },
  methods: {
    onLogin() {
      this.$router.push('/edit-profile')
    },
  },
}
</script>
