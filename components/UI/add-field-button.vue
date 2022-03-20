<template>
  <button
    class="p-2 border-2 border-gunsmoke rounded text-sm"
    @click="$emit('onClick')"
  >
    + {{ label }}
  </button>
</template>

<script>
export default {
  name: 'AddFieldButton',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>
