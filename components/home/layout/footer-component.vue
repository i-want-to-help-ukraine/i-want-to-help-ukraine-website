<template>
  <div
    class="bg-white grid md:grid-cols-2 lg:grid-cols-3 gap-16 mx-auto px-6 lg:px-16 py-6 max-w-[1800px]"
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
      <div class="flex flex-col gap-6">
        <nuxt-link to="/terms-of-use">Terms of Use</nuxt-link>
        <nuxt-link to="/about-us">About Us</nuxt-link>
      </div>
    </div>
    <div class="flex flex-col justify-between xl:items-end">
      <div class="flex mb-4">
        <social-button
          href="https://instagram.com/volunteers_ua_com/"
          type="instagram"
        />
      </div>
      <custom-button
        variant="secondary"
        @handleClick="onLogin"
        class="become-volunteer-button"
        >Become a volunteer</custom-button
      >
    </div>
  </div>
</template>

<script>
import { CustomButton, SocialButton } from '../../UI'

export default {
  components: { SocialButton, CustomButton },
  nane: 'FooterComponent',
  methods: {
    onLogin() {
      this.$router.push('/sign-in')
    },
  },
}
</script>
