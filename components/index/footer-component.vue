<template>
  <div
    class="grid md:grid-cols-2 lg:grid-cols-3 gap-16 mx-auto px-2 py-12 max-w-[1800px]"
  >
    <div>
      <nuxt-link to="/">
        <h1
          class="m-0 text-xl sm:text-3xl font-semibold sm:text-2xl capitalize text-gunsmoke"
        >
          🇺🇦 Help Ukraine!
        </h1>
      </nuxt-link>
      <span class="text-gunsmoke text-sm mt-4">@All rights reserver</span>
    </div>
    <div class="grid sm:grid-cols-2 cols-span-3 gap-48 text-marine font-medium">
      <div class="flex flex-col grid gap-6">
        <nuxt-link to="/support">Support</nuxt-link>
        <nuxt-link to="/support">Volunteers</nuxt-link>
      </div>
      <div class="flex flex-col grid gap-6">
        <nuxt-link to="/support">Contacts</nuxt-link>
        <nuxt-link to="/support">Team</nuxt-link>
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
import { CustomButton, SocialButton } from '../UI/index.js'
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
