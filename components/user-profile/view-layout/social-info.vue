<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Find out more</h2>
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
}
</script>
