<template>
  <div class="flex flex-wrap w-full">
    <profile-tag v-for="city in cities" :key="city.id" class="mr-1 my-1">
      {{ city.title }}
    </profile-tag>
  </div>
</template>

<script>
import ProfileTag from '../profile-tag.vue'

export default {
  components: { ProfileTag },
  name: 'city-chips',
  props: {
    cities: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
