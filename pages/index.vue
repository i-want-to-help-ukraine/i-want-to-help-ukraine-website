<template>
  <div>
    <hero-index class="mx-4 sm:mx-8" />
    <div class="mx-auto flex flex-col items-center">
      <volunteer-list
        :volunteers-list="getVolunteersList"
        class="mx-4 sm:mx-0"
        @volunteer-selected="onVolunteerMobileSelected"
      />
    </div>
  </div>
</template>

<script>
import HeroIndex from '../components/index/hero-index.vue'
import VolunteerList from '../components/index/volunteer-list'

export default {
  name: 'IndexPage',
  components: { VolunteerList, HeroIndex },
  data() {
    return {
      selectedCity: null,
      selectedVolunteer: null,
      volunteersList: [],
    }
  },
  computed: {
    getVolunteersList() {
      return this.$store.state.volunteers.list

      // return this.$store.user.tempData.userInfo
      // if (this.selectedCity === null) {
      //   return this.volunteersList
      // }

      // return this.volunteersList.filter(
      //   (volunteer) => volunteer.user_metadata.city === this.selectedCity
      // )
    },
  },
  async created() {
    // await this.$store.dispatch('volunteers/fetchList')
    // this.volunteersList = this.$store.getters['volunteers/filteredList']
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
