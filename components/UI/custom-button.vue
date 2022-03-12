<template>
  <button
    :class="['rounded', typeToStyle()]"
    :type="type"
    @click="$emit('handleClick')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    type: {
      type: String,
      default: '',
    },
    classes: {
      type: String,
      default: '',
    },
  },
  methods: {
    typeToStyle() {
      return {
        'bg-cyan-500 text-white py-2 px-4 ': this.type === 'submit',
        'bg-marine px-12 py-4 text-[#fff] font-medium rounded-md':
          this.type === 'primary',
        'bg-lemon px-8 py-2 rounded-md h-full text-sm font-semibold sm:text-md':
          this.type === 'secondary',
      }
    },
  },
}
</script>
