<template>
  <div
    class="py-4 md:py-16 px-2 sm:px-16 mx-auto max-w-[1800px] flex flex-col items-center min-h-full"
  >
    <div
      class="flex flex-col items-center md:flex-row sm:w-full my-12 px-4 md:px-0"
    >
      <div
        class="flex flex-col items-start justify-center font-[Montserrat] w-full"
      >
        <h2
          class="text-left text-marine text-md lg:text-xl font-light sm:block"
        >
          руський воєнний корабль, ІДИ НАХ#Й
        </h2>
        <h1 class="text-left text-5xl md:text-6xl font-medium mt-4">
          Stand with Ukraine
        </h1>
        <p class="mt-8 max-w-[650px] text-lg">
          <span class="text-gunsmoke">
            All volunteers on the website are just ordinary people, who help
            territorial defense, the army and Ukrainian citizens all over the
            country.
          </span>
          <br />
          <b>You can help any of them to save Ukraine and fight the war.</b>
        </p>
        <custom-button
          variant="cta"
          class="block mt-8"
          @handleClick="handleDonationClick"
        >
          Make Donation
        </custom-button>
      </div>
      <div class="w-full flex flex-col items-center justify-center mt-8">
        <div class="">
          <div class="my-4 max-w-[300px] flex items-center">
            <span class="text-5xl mr-4">1.</span>
            <p class="text-lg opacity-60">
              Choose a volunteer based on their activities or city
            </p>
          </div>
          <div class="my-4 max-w-[450px] flex items-center">
            <span class="text-5xl mr-4">2.</span>
            <p class="text-lg opacity-60">
              Find out more about the volunteer on their page, check out their
              social networks
            </p>
          </div>
          <div class="my-4 max-w-[300px] flex items-center">
            <span class="text-5xl mr-4">3.</span>
            <p class="text-lg opacity-60">
              Make a donation in any of possible ways
            </p>
          </div>
          <p class="my-4 text-lg max-w-[600px]">
            <b>All volunteers are manually moderated</b>
            <br />
            <span class="text-gunsmoke">
              Donations go directly to a volunteer without our commission
            </span>
          </p>
        </div>
      </div>
    </div>
    <hero-index class="mt-6 md:my-0" />
    <div id="list" />
    <volunteer-list
      v-if="volunteersSearch"
      :volunteers="volunteersSearch"
      class="mb-6 md:mb-0 mt-6"
    />
    <custom-loader v-else />
    <custom-button
      v-if="volunteersSearch && volunteersSearch.totalCount > count"
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
import VolunteerList from '../components/index/volunteer-list.vue'
import { CustomButton } from '../components/UI'
import CustomLoader from '../components/UI/custom-loader.vue'
import { GET_VOLUNTEERS } from '../graphql'

export default {
  name: 'IndexPage',
  components: { VolunteerList, HeroIndex, CustomButton, CustomLoader },
  data() {
    return {
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
    handleDonationClick() {
      this.$router.push('#list')
    },
    showVolunteers() {
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
