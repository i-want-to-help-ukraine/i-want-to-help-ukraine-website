<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Social Links</h2>
      <div class="flex">
        <a
          v-for="{ link, name } in schema"
          :key="name"
          :href="link"
          class="mr-2"
        >
          <b-image
            class="volunteer-social-media-icon"
            :src="getIcon(name)"
            alt="name"
          ></b-image>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialInfo',
  props: {
    values: {
      type: Object,
      default: () => {},
    },
    schema: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getIcon(name) {
      const nameToIcon = {
        facebook: require(`@/assets/icons/facebook.svg`),
        instagram: require(`@/assets/icons/instagram.svg`),
      }

      return nameToIcon[name]
    },
  },
}
</script>
