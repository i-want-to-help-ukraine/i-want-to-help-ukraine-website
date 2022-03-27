<template>
  <div
    class="py-4 md:py-16 px-2 sm:px-16 mx-auto max-w-[1800px] flex flex-col items-center"
  >
    <div class="grid md:grid-cols-2 w-full">
      <div class="md:flex items-left md:items-center">
        <h2 class="text-center text-marine text-base font-light sm:hidden mb-4">
          русский военный корабль, ИДИ НАХ#Й
        </h2>
        <img :src="soldier" class="max-w-[400px] w-full md:hidden" alt="" />
        <div
          class="flex flex-col items-center sm:items-start max-w-[460px] font-[Montserrat] my-6"
        >
          <h2
            class="text-left text-marine text-md lg:text-xl font-light hidden sm:block"
          >
            русский военный корабль, ИДИ НАХ#Й
          </h2>
          <h1
            class="text-center sm:text-left text-3xl sm:text-6xl lg:text-7xl font-medium mt-4"
          >
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
    <hero-index class="my-6 md:my-0" />
    <volunteer-list
      v-if="volunteersSearch"
      :volunteers="volunteersSearch"
      class="my-6 md:my-0"
    />
    <custom-button
      v-if="volunteersSearch"
      variant="secondary"
      class="mt-12"
      @handleClick="showVolunteers"
    >
      Show all {{ volunteersSearch.totalCount }} volunteers
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
      count: 3,
    }
  },
  apollo: {
    volunteersSearch: {
      query: GET_VOLUNTEERS,
      prefetch: true,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          input: {
            cityIds: this.selectedCities,
            activityIds: this.selectedActivities,
            startCursor: null,
            count: this.count,
          },
        }
      },
    },
  },
  computed: {
    ...mapState({
      selectedCities: ({ volunteers }) =>
        volunteers?.selectedCities.map(({ id }) => id),
      selectedActivities: ({ volunteers }) => volunteers.selectedActivities,
    }),
  },
  methods: {
    onLogin() {
      this.$router.push('/edit-profile')
    },
    showVolunteers() {
      // this.$router.push({ path: '/volunteers' })
      this.count = this.volunteersSearch.totalCount
    },
  },
}
</script>

<style>
.volunteers-container {
  min-height: 40vh;
}
</style>
