<template>
  <div
    class="py-10 md:py-16 px-2 sm:px-16 mx-auto max-w-[1800px] flex flex-col items-center min-h-full"
  >
    <div
      class="flex flex-col items-center md:flex-row sm:w-full my-6 lg:my-12 px-4 md:px-0"
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
          class="block mt-8 make-donation-button"
          @handleClick="scrollToVolunteerList"
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
    <div
      v-if="volunteersSearch"
      id="volunteers-list"
      class="w-full flex flex-col items-center"
    >
      <volunteer-list
        :volunteers="volunteersSearch"
        :count="count"
        :onCountSelect="onCountSelect"
        class="mb-6 md:mb-0 mt-6"
      />
      <v-pagination
        v-model="page"
        :page-count="totalPageCount"
        :click-handler="loadVolunteers"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :force-page="1"
        container-class="pagination-container flex mt-6 lg:mt-12"
      />
    </div>
    <custom-loader v-else />
  </div>
</template>

<script>
import scrollToElement from 'scroll-to-element'
import { mapState } from 'vuex'
import HeroIndex from '../components/home/hero/hero-index.vue'
import VolunteerList from '../components/home/volunteers-list/index.vue'
import { CustomButton } from '../components/UI'
import CustomLoader from '../components/UI/custom-loader.vue'
import { GET_VOLUNTEERS } from '../graphql'
import { buildURLParams, parseURLParams } from '../utils/URLParams'

export default {
  name: 'IndexPage',
  middleware: ['filters'],
  components: { VolunteerList, HeroIndex, CustomButton, CustomLoader },
  data() {
    return {
      count: 15,
      offset: 0,
      page: 1,
      URLParams: this.$route.query,
      parsedURLParams: {},
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
            cityIds: this.selectedCities.map(({ id }) => id),
            activityIds: this.selectedActivities.map(({ id }) => id),
            offset: this.offset,
            count: this.count,
          },
        }
      },
    },
  },
  watch: {
    selectedCities() {
      this.page = 1
      this.offset = 0
      this.changeURLParams(
        'cities',
        this.selectedCities.map(({ title }) => title)
      )
    },
    selectedActivities() {
      this.page = 1
      this.offset = 0
      this.changeURLParams(
        'activities',
        this.selectedActivities.map(({ title }) => title)
      )
    },
    page(newValue) {
      this.changeURLParams('page', newValue)
    },
    count(newValue) {
      this.changeURLParams('count', newValue)
    },
    offset(newValue) {
      this.changeURLParams('offset', newValue)
    },
    cities(newValue) {
      if (newValue.length) this.preFillSelectedCities()
    },
    activities(newValue) {
      if (newValue.length) this.preFillSelectedActivities()
    },
  },
  computed: {
    ...mapState({
      cities: ({ volunteers }) => volunteers.cities,
      activities: ({ volunteers }) => volunteers.activities,
      selectedCities: ({ volunteers }) => volunteers?.selectedCities,
      selectedActivities: ({ volunteers }) => volunteers?.selectedActivities,
    }),
    totalPageCount() {
      return this.volunteersSearch
        ? Math.ceil(this.volunteersSearch.totalCount / this.count)
        : 1
    },
  },
  created() {
    if (this.URLParams) {
      this.parsedURLParams = parseURLParams(this.URLParams)
      this.preFillData()
    }
  },
  methods: {
    scrollToVolunteerList() {
      scrollToElement('#volunteers-list', { duration: 500 })
    },
    loadVolunteers(page) {
      this.offset = (page - 1) * this.count
      this.scrollToVolunteerList()
    },
    onCountSelect(value) {
      this.page = 1
      this.offset = 0
      this.count = Number(value)
    },
    changeURLParams(key, value) {
      this.URLParams = buildURLParams(this.URLParams, key, value)
      this.$router.push({ query: this.URLParams })
    },
    preFillData() {
      const { page, offset, count } = this.parsedURLParams
      if (page) this.page = page
      if (offset) this.offset = offset
      if (count) this.count = count
    },
    preFillSelectedCities() {
      const { cities } = this.parsedURLParams
      if (cities && cities.length) {
        const selectedCities = this.cities.filter((city) =>
          cities.includes(city.title)
        )
        this.$store.dispatch('volunteers/setSelectedCities', selectedCities)
      }
    },
    preFillSelectedActivities() {
      const { activities } = this.parsedURLParams
      if (activities && activities.length) {
        const selectedActivities = this.activities.filter((activity) =>
          activities.includes(activity.title)
        )
        this.$store.dispatch(
          'volunteers/setSelectedActivities',
          selectedActivities
        )
      }
    },
  },
}
</script>

<style>
.volunteers-container {
  min-height: 40vh;
}

.pagination-container li {
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  margin: 0 8px;
  border-radius: 0.375rem;
}

.pagination-container li.active {
  background-color: #6dacf6;
}

.pagination-container li.active a {
  cursor: default;
  color: white;
}

.pagination-container li.disabled a {
  cursor: default;
  color: #828282;
}
</style>
