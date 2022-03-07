<template>
  <textarea
    :value="value"
    :class="['p-2 rounded border-2', styles]"
    @input="$emit('onInput', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    styles: {
      type: String,
      default: '',
    },
  },
}
</script>
