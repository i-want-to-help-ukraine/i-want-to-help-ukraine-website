<template>
  <div
    class="py-4 md:py-16 px-2 sm:px-16 mx-auto max-w-[1800px] flex flex-col items-center min-h-full"
  >
    <div class="flex sm:w-full">
      <div class="md:flex items-left md:items-center">
        <div
          class="flex flex-col items-center sm:items-start font-[Montserrat] my-12"
        >
          <h2
            class="text-left text-marine text-md lg:text-xl font-light sm:block"
          >
            руський воєнний корабль, ІДИ НАХ#Й
          </h2>
          <h1 class="text-left text-3xl text-6xl font-medium mt-4 text-center">
            Stand with Ukraine
          </h1>
          <custom-button variant="cta" class="block mt-8" @handleClick="onLogin"
            >Become a volunteer</custom-button
          >
        </div>
      </div>
      <div
        class="hidden md:flex flex-col items-center justify-center sm:items-end mt-8"
      ></div>
    </div>
    <hero-index class="my-6 md:my-0" />
    <volunteer-list
      v-if="volunteersSearch"
      :volunteers="volunteersSearch"
      class="my-6 md:my-0"
    />
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
import { GET_VOLUNTEERS } from '../graphql'

export default {
  name: 'IndexPage',
  components: { VolunteerList, HeroIndex, CustomButton },
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
    onLogin() {
      this.$router.push('/edit-profile')
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
