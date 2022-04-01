<template>
  <div
    :class="`bg-marine fixed z-10 top-0 right-0 h-full w-full ${
      open || 'hidden'
    }`"
  >
    <div class="flex flex-col items-center justify-center p-2 w-full h-full">
      <menu-link
        v-if="isAuthorized || authCookiePresent"
        to="/edit-profile"
        @onClick="close"
        >Profile</menu-link
      >
      <div v-else class="mb-2">
        <custom-button variant="secondary" @handleClick="onLogin">
          Become a volunteer
        </custom-button>
      </div>
      <menu-link to="/how-to-help" @onClick="close">How to Help</menu-link>
      <menu-link to="/about-us" @onClick="close">About Us</menu-link>
    </div>
  </div>
</template>

<script>
import { authCookiePresent } from '../../../utils/auth'
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
    authCookiePresent() {
      return authCookiePresent()
    },
  },
  methods: {
    onLogin() {
      this.$router.push('/edit-profile')
      this.close()
    },
    close() {
      this.$emit('onClose')
    },
  },
}
</script>
