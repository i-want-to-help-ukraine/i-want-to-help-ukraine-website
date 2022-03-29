<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Social Links</h2>
      <div class="flex">
        <social-button
          v-for="{ id, url, provider } in userInfo"
          :key="id"
          :href="url"
          class="mr-2"
          :type="provider.title"
        />
        <!-- <a
          v-for="{ id, url, provider } in userInfo"
          :key="id"
          target="_blank"
          :href="url.includes('//') ? url : '//' + url"
          class="mr-2"
        >
          <img
            class="volunteer-social-media-icon"
            :src="getIcon(provider.title)"
            :alt="provider.title"
          />
        </a> -->
      </div>
    </div>
  </div>
</template>

<script>
import SocialButton from '../../UI/social-button.vue'
export default {
  name: 'SocialInfo',
  components: {
    SocialButton,
  },
  props: {
    userInfo: {
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
