<template>
  <div>
    <div class="mt-5 mb-5 flex flex-col sm:flex-row justify-between">
      <h4 class="text-2xl mb-4">Volunteers:</h4>
      <search-filters />
    </div>
    <nuxt-link
      v-for="volunteer in volunteersList"
      :key="volunteer.userInfo.id"
      class="mb-5 p-2 sm:p-5 flex items-start sm:items-center shadow hover:shadow-md rounded"
      :to="`/user-profile/${volunteer.userInfo.id}`"
      @click="onVolunteerClick(volunteer)"
    >
      <user-pic :image="volunteer.userInfo.userPic" />
      <div class="ml-4 flex-col">
        <h5 class="text-lg sm:text-2xl mr-2">
          {{ volunteer.userInfo.firstName }} {{ volunteer.userInfo.lastName }}
        </h5>
        <p class="text-base sm:text-md">
          {{ volunteer.userInfo.city }}
        </p>
        <p class="text-base">
          {{ volunteer.userInfo.description }}
        </p>
        <div class="flex mt-4">
          <a target="_blank" :href="volunteer.socialInfo.instagram">
            <img
              v-if="volunteer.socialInfo.instagram"
              class="w-8"
              :src="require(`@/assets/icons/instagram.svg`)"
              alt="instagram"
            />
          </a>
          <a target="_blank" :href="volunteer.socialInfo.facebook">
            <img
              v-if="volunteer.socialInfo.facebook"
              class="w-8"
              :src="require(`@/assets/icons/facebook.svg`)"
              alt="facebook"
            />
          </a>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import UserPic from '../user-profile/user-pic.vue'
import SearchFilters from './search-filters.vue'
export default {
  name: 'VolunteerList',
  components: { UserPic, SearchFilters },
  props: {
    volunteersList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onVolunteerClick(volunteer) {
      this.$emit('volunteer-selected', volunteer)
    },
  },
}
</script>
