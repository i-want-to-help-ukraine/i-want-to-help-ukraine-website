<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Bio</h2>
      <p>{{ userInfo.description }}</p>
    </div>
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
