<template>
  <p>
    <span>Org: </span>
    <span class="font-semibold">{{ organization }}</span>
  </p>
</template>

<script>
export default {
  name: 'Organization',
  props: {
    organization: {
      type: String,
      default: '',
    },
  },
}
</script>
