<template>
  <div
    class="h-full px-4 py-3 sm:px-5 sm:py-6 flex flex-col items-center rounded-xl bg-white hover:bg-grey duration-150 h-min"
  >
    <user-pic :src="volunteer.avatarUrl" class="mb-4 w-full" />
    <div class="flex flex-col justify-between w-full">
      <h5 class="text-md sm:text-xl mr-2">
        {{ volunteer.firstName }} {{ volunteer.lastName }}
      </h5>
      <p class="text-base text-marine font-medium">
        {{ formatCities(volunteer.cities) }}
      </p>
      <p class="text-sm sm:text-base text-gunsmoke mt-2">
        {{
          volunteer.description
            ? volunteer.description.substring(0, 65) + '...'
            : '...'
        }}
      </p>
      <div class="mt-2">
        <p
          v-for="{ id, title } in volunteer.activities"
          :key="id"
          class="text-sm"
        >
          {{ title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VolunteerCard',
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
