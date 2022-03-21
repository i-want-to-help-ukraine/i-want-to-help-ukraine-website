<template>
  <div class="rounded-xl bg-marine text-white px-2 mr-2">
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
