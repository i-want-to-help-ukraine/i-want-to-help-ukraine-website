<template>
  <div class="w-full">
    <div class="mb-5 flex flex-col sm:flex-row justify-between">
      <h4 class="text-xl mb-4 font-semibold text-gunsmoke">Volunteers</h4>
      <search-filters />
    </div>
    <div
      v-if="volunteers.length"
      class="grid gap-3 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      <nuxt-link
        v-for="volunteer in volunteers"
        :key="volunteer.id"
        class="px-4 py-3 sm:px-5 sm:py-6 flex items-center rounded-xl bg-white"
        :to="`/user-profile/${volunteer.id}`"
        @click="onVolunteerClick(volunteer)"
      >
        <!-- <user-pic :image="volunteer.userPic" class='w-16 h-16 ' /> -->
        <user-pic
          src="https://kor.ill.in.ua/m/610x385/2715360.jpg"
          class="w-16 h-16"
        />
        <div class="ml-4 flex-col w-full">
          <div class="flex justify-between items-center mb-3">
            <p class="text-base text-marine font-medium">
              {{ formatCities(volunteer.cities) }}
            </p>
            <div class="flex">
              <social-button
                v-for="{ id, url } in volunteer.social"
                :key="id"
                :href="url"
                type="facebook"
              />
            </div>
          </div>
          <h5 class="text-md sm:text-xl mr-2">
            {{ volunteer.firstname }} {{ volunteer.lastname }}
          </h5>
          <p class="text-sm sm:text-base text-gunsmoke">
            {{
              volunteer.description
                ? volunteer.description.substring(0, 70) + '...'
                : '...'
            }}
          </p>
        </div>
      </nuxt-link>
    </div>
    <div v-else>No volunteers</div>
  </div>
</template>

<script>
import SocialButton from '../UI/social-button.vue'
import UserPic from '../user-profile/user-pic.vue'
import SearchFilters from './search-filters.vue'
export default {
  name: 'VolunteerList',
  components: { UserPic, SearchFilters, SocialButton },
  props: {
    volunteers: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onVolunteerClick(volunteer) {
      this.$emit('volunteer-selected', volunteer)
    },
    formatCities: (cities) => cities.map(({ title }) => title).join(', '),
  },
}
</script>
