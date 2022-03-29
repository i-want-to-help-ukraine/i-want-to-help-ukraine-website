<template>
  <div :class="[classObject, 'rounded-full px-3 shadow']">
    <span class="capitalize font-medium">
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AccountStatus',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    classObject() {
      const { value } = this
      return {
        'bg-lemon': value === 'requested' || value === 'in progress',
        'bg-red-500': value === 'banned',
        'bg-yellowgreen': value === 'verified',
      }
    },
  },
}
</script>
