<template>
  <div
    class="grid md:grid-cols-2 lg:grid-cols-3 gap-16 mx-auto px-6 py-12 max-w-[1800px]"
  >
    <div>
      <nuxt-link class="block mb-2" to="/">
        <img
          width="240"
          alt="VolunteersUA"
          src="https://res.cloudinary.com/volunteersua/image/upload/v1648925180/logo/volunteers-ua-horizontal_wq93oo.svg"
        />
      </nuxt-link>
      <span class="text-gunsmoke text-sm mt-4">@All rights reserver</span>
    </div>
    <div class="flex flex-wrap text-marine font-medium">
      <div class="flex flex-col gap-6 mr-8">
        <!-- <nuxt-link to="/support">Support</nuxt-link> -->
        <!-- <nuxt-link to="/support">Volunteers</nuxt-link> -->
      </div>
      <div class="flex flex-col gap-6">
        <nuxt-link to="/terms-of-use">Terms of Use</nuxt-link>
        <nuxt-link to="/about-us">About Us</nuxt-link>
      </div>
    </div>
    <div class="flex flex-col justify-between xl:items-end">
      <div class="flex mb-4">
        <social-button
          href="https://instagram.com/howtohelpua"
          type="instagram"
        />
        <social-button
          href="https://facebook.com/howtohelpua"
          type="facebook"
        />
      </div>
      <custom-button variant="secondary" @handleClick="onLogin"
        >Become a volunteer</custom-button
      >
    </div>
  </div>
</template>

<script>
import { CustomButton, SocialButton } from '../UI'

export default {
  components: { SocialButton, CustomButton },
  nane: 'FooterComponent',
  methods: {
    onLogin() {
      this.$router.push('/edit-profile')
    },
  },
}
</script>
