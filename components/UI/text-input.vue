<template>
  <div class="flex flex-col">
    <input
      :aria-label="name"
      type="text"
      :value="value"
      :class="[
        'p-2 pr-5 rounded',
        { 'border-2 border-danger': errors && errors[name] },
        { 'text-gunsmoke outline-none cursor-not-allowed': readonly },
      ]"
      :placeholder="placeholder"
      :readonly="readonly"
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
    readonly: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
