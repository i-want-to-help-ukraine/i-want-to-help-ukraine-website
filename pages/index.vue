<template>
  <div class="container">
    <div class="block mt-5 mb-5 pl-5 pr-5">
      <SearchFilters />
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
      volunteersList: [],
    }
  },
  computed: {
    getVolunteersList() {
      if (this.selectedCity === null) {
        return this.volunteersList
      }

      return this.volunteersList.filter(
        (volunteer) => volunteer.user_metadata.city === this.selectedCity
      )
    },
  },
  async created() {
    await this.$store.dispatch('volunteers/setList')
    this.volunteersList = this.$store.getters['volunteers/filteredList']
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

// function mockVolunteersList() {
//   return [
//     {
//       id: 1,
//       name: 'Piotr Evseenko',
//       instagram: 'https://instagram.com/abc',
//       city: 'kyiv',
//       volunteerActivities: [],
//       moneyTransferOptions: [
//         {
//           type: 'bitcoin',
//           credentials: [
//             {
//               label: 'Bitcoin',
//               value: 'bc1q3wjewwcny0g43u47rzu08mn0fvkkj35g4u6xtk',
//             },
//           ],
//         },
//         {
//           type: 'debit-card',
//           credentials: [
//             {
//               label: 'Cardholder Name',
//               value: 'Piotr Evseenko',
//             },
//             {
//               label: 'Card number',
//               value: '2222 2222 2222 2222',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: 'Alina Genadienko',
//       instagram: 'https://instagram.com/efg',
//       city: 'kyiv',
//       volunteerActivities: [],
//       moneyTransferOptions: [
//         {
//           type: 'debit-card',
//           credentials: [
//             {
//               label: 'Cardholder Name',
//               value: 'Alina Genadienko',
//             },
//             {
//               label: 'Card number',
//               value: '0000 0000 0000 0000',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: 'Anastasia',
//       instagram: 'https://instagram.com/hig',
//       city: 'kharkiv',
//       volunteerActivities: [],
//       moneyTransferOptions: [
//         {
//           type: 'debit-card',
//           credentials: [
//             {
//               label: 'Cardholder Name',
//               value: 'Anastasia',
//             },
//             {
//               label: 'Card number',
//               value: '1111 1111 1111 1111',
//             },
//           ],
//         },
//       ],
//     },
//   ]
// }
</script>

<style>
.volunteers-container {
  min-height: 40vh;
}
</style>
