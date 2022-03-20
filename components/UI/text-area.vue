<template>
  <div class="flex flex-col">
    <textarea
      :value="value"
      :class="[
        'p-2 rounded',
        { 'border-2 border-danger': errors && errors[name] },
      ]"
      :placeholder="placeholder"
      @input="$emit('onInput', $event.target.value)"
    />
    <span class="mt-1 text-sm text-danger">{{ errors && errors[name] }}</span>
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
    styles: {
      type: String,
      default: '',
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
}
</script>
