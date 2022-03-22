<template>
  <div
    class="py-8 md:py-16 md:px-16 mx-auto max-w-[1800px] flex flex-col items-center"
  >
    <div class="grid md:grid-cols-2 w-full">
      <div class="md:flex items-left md:items-center">
        <img :src="soldier" class="max-w-[400px] w-full md:hidden" alt="" />
        <div class="max-w-[460px] px-16 md:px-0 font-[Montserrat] my-6">
          <h2 class="text-marine text-md lg:text-xl font-light">
            русский военный корабль, ИДИ НАХ#Й
          </h2>
          <h1 class="text-6xl lg:text-7xl font-medium mt-4">
            Stand with Ukraine 🙏
          </h1>
          <custom-button
            variant="cta"
            class="block mt-8 md:mt-4"
            @handleClick="onLogin"
            >Become a volunteer</custom-button
          >
        </div>
      </div>
      <div
        class="hidden md:flex flex-col items-center justify-center sm:items-end mt-8"
      >
        <img
          :src="soldier"
          class="max-w-[400px] lg:max-w-[800px] w-full"
          alt=""
        />
      </div>
    </div>
    <hero-index class="px-16 md:px-0 my-6 md:my-0" />
    <volunteer-list
      v-if="volunteersSearch"
      :volunteers="volunteersSearch"
      class="px-16 md:px-0 my-6 md:my-0"
    />
    <custom-button
      v-if="volunteersSearch"
      variant="secondary"
      class="mt-12"
      @handleClick="showVolunteers"
    >
      Show all {{ volunteersSearch.length }} volunteers
    </custom-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeroIndex from '../components/index/hero-index.vue'
import VolunteerList from '../components/index/volunteer-list'
import { CustomButton } from '../components/UI/index.js'
import soldier from '../assets/img/soldier.png'
import { GET_VOLUNTEERS } from '../graphql'

export default {
  name: 'IndexPage',
  components: { VolunteerList, HeroIndex, CustomButton },
  data() {
    return {
      soldier,
    }
  },
  apollo: {
    volunteersSearch: {
      query: GET_VOLUNTEERS,
      prefetch: true,
      variables() {
        const {
          selectedCities,
          selectedActivities,

          // selectedSocialProviders, selectedPaymentProviders, selectedContactProviders
        } = this.volunteers
        return {
          input: {
            cityIds: selectedActivities,
            activityIds: selectedCities,
            startCursor: null,
            count: 5,
            // socialProviderIds: selectedSocialProviders,
            // paymentProviderIds: selectedPaymentProviders,
            // contactProviderIds: selectedContactProviders,
          },
        }
      },
    },
  },
  computed: mapState(['volunteers']),
  methods: {
    onLogin() {
      this.$router.push('/edit-profile')
    },
    showVolunteers() {
      this.$router.push({ path: '/volunteers' })
    },
  },
}
</script>

<style>
.volunteers-container {
  min-height: 40vh;
}
</style>
