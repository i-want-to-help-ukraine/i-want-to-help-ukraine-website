<template>
  <div class="rounded bg-marine text-white font-medium px-4">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ProfileTag',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
}
</script>
