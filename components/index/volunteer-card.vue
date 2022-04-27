<template>
  <div
    class="h-min md:h-full flex flex-col justify-between overflow-hidden rounded-xl bg-white hover:bg-grey duration-150"
  >
    <user-pic :src="volunteer.avatarUrl" class="w-full rounded-lg" />
    <div class="p-3">
      <h5 class="text-md sm:text-xl mr-2">
        {{ volunteer.firstName }} {{ volunteer.lastName }}
      </h5>
      <p class="text-base text-marine font-medium">
        {{ formatCities(volunteer.cities) }}
      </p>
      <p class="text-sm sm:text-base text-gunsmoke mt-2">
        {{
          volunteer.description
            ? volunteer.description.substring(0, 120) + '...'
            : '...'
        }}
      </p>
    </div>
    <p class="pt-3 p-6 sm:pt-0 sm:p-3 text-center sm:text-left">View More</p>
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
    formatCities: (cities) => {
      if (cities.length > 3) {
        const citiesToShow = cities
          .slice(0, 3)
          .map(({ title }) => title)
          .join(', ')

        return `${citiesToShow} & ${cities.length - 4} others`
      }

      return cities?.map(({ title }) => title).join(', ')
    },
  },
}
</script>
