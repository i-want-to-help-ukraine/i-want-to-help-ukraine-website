<template>
  <div>
    <div class="flex flex-col">
      <div class="flex -ml-2">
        <social-button
          v-for="{ id, url, provider } in userInfo"
          :key="id"
          :href="url"
          class="mr-2"
          :type="provider.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import facebook from '@/assets/icons/facebook.svg'
import instagram from '@/assets/icons/instagram.svg'
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
        facebook,
        instagram,
      }
      return nameToIcon[name]
    },
  },
}
</script>
