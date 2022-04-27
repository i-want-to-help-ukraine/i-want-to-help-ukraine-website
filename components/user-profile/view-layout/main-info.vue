<template>
  <div class="flex flex-col">
    <h2 class="text-2xl mb-2">Information</h2>
    <p class="whitespace-pre-line">{{ userInfo.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
    schema: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
