<template>
  <div class="flex flex-col">
    <input
      type="text"
      :value="value"
      :class="[
        'p-2 rounded',
        { 'border-2 border-danger': errors && errors[name] },
      ]"
      :placeholder="placeholder"
      @input="$emit('onInput', $event.target.value)"
      @blur="$emit('onBlur', $event.target.value)"
    />
  </div>
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
    errors: {
      type: Object,
      default: () => {},
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
}
</script>
