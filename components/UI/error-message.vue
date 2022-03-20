<template>
  <span class="mt-1 text-sm text-danger">{{ error }}</span>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    error: {
      type: String,
      default: '',
    },
  },
}
</script>
