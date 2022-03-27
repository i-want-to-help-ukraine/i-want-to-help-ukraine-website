<template>
  <div class="w-full">
    <user-pic :src="volunteer.avatarUrl" class="mb-4 w-full" />
    <div class="flex flex-col justify-between w-full">
      <div class="flex justify-between">
        <h5 class="text-md sm:text-xl mr-2">
          {{ volunteer.firstName }} {{ volunteer.lastName }}
        </h5>
        <div class="flex">
          <social-button
            v-for="{ id, url, provider = {} } in volunteer.social"
            :key="id"
            :href="url"
            :type="provider.title"
          />
        </div>
      </div>
      <p class="text-base text-marine font-medium">
        {{ formatCities(volunteer.cities) }}
      </p>
      <p class="text-sm sm:text-base text-gunsmoke mt-2">
        {{
          volunteer.description
            ? volunteer.description.substring(0, 70) + '...'
            : '...'
        }}
      </p>
    </div>
  </div>
</template>

<script>
import { SocialButton } from '../UI/index.js'

export default {
  name: 'VolunteerCard',
  components: {
    SocialButton,
  },
  props: {
    volunteer: {
      type: Object,
      default: null,
    },
  },
  methods: {
    formatCities: (cities) => cities?.map(({ title }) => title).join(', '),
  },
}
</script>
