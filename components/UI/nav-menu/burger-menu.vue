<template>
  <div
    :class="`bg-marine fixed z-10 top-0 right-0 h-full w-full ${
      open || 'hidden'
    }`"
  >
    <div class="flex flex-col items-center justify-center p-2 w-full h-full">
      <menu-link v-if="token" to="/edit-profile" @onClick="close"
        >Profile</menu-link
      >
      <menu-link to="/how-to-help" @onClick="close">How to Help</menu-link>
      <menu-link to="/about-us" @onClick="close">About Us</menu-link>
      <menu-link to="/how-to-fundrise" @onClick="close" class="text-center">
        Як створитти посилання для оплати?
      </menu-link>
      <div v-if="!token" class="mt-2">
        <custom-button variant="secondary" @handleClick="onLogin">
          Become a volunteer
        </custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState({
      token: ({ auth }) => auth.authUser?.accessToken,
    }),
  },
  methods: {
    onLogin() {
      this.$router.push('/sign-in')
      this.close()
    },
    close() {
      this.$emit('onClose')
    },
  },
}
</script>
