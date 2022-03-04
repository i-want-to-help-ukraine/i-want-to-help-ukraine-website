<template>
  <div class="container">
    <div class="block mt-5 mb-5 pl-5 pr-5">
      <SearchFilters @city-selected="onCitySelected" />
    </div>

    <div class="block pl-5 pr-5 is-hidden-desktop">
      <VolunteerList
        :volunteers-list="getVolunteersList"
        @volunteer-selected="onVolunteerMobileSelected"
      />

      <b-modal v-model="isModalOpen" :width="440" class="p-4">
        <div class="card">
          <VolunteerDetail
            v-if="selectedVolunteer"
            :volunteer-detail="selectedVolunteer"
          />
        </div>
      </b-modal>
    </div>

    <div class="block mt-5 mb-5 volunteers-container is-hidden-mobile">
      <div class="columns">
        <div class="column">
          <VolunteerList
            :volunteers-list="getVolunteersList"
            @volunteer-selected="onVolunteerSelected"
          />
        </div>
        <div class="column">
          <VolunteerDetail
            v-if="selectedVolunteer"
            :volunteer-detail="selectedVolunteer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilters from '../components/index/search-filters'
import VolunteerDetail from '../components/index/volunteer-detail'
import VolunteerList from '../components/index/volunteer-list'

export default {
  name: 'IndexPage',
  components: { VolunteerList, VolunteerDetail, SearchFilters },
  data() {
    return {
      isModalOpen: false,
      selectedCity: null,
      selectedVolunteer: null,
    }
  },
  computed: {
    getVolunteersList() {
      if (this.selectedCity === null) {
        return this.$store.state.volunteers.volunteersList || []
      }

      return this.$store.state.volunteers.volunteersList.filter(
        (volunteer) => volunteer.city === this.selectedCity
      )
    },
  },
  methods: {
    onVolunteerMobileSelected(selectedVolunteer) {
      this.selectedVolunteer = { ...selectedVolunteer }
      this.isModalOpen = true
    },
    onVolunteerSelected(selectedVolunteer) {
      this.selectedVolunteer = { ...selectedVolunteer }
    },
    onCitySelected(value) {
      this.selectedCity = value
    },
  },
}
</script>

<style>
.volunteers-container {
  min-height: 40vh;
}
</style>
