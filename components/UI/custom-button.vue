<template>
  <button
    :class="['rounded hover:brightness-95 duration-150', typeToStyle()]"
    :variant="variant"
    @click="$emit('handleClick')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    variant: {
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
        'bg-marine text-white py-2 px-4 rounded-md': this.variant === 'primary',
        'bg-transparent text-marine py-2 px-4 rounded-md border-2 border-marine':
          this.variant === 'primary-outline',
        'bg-lemon px-8 py-2 rounded-md h-full text-sm font-semibold sm:text-md':
          this.variant === 'secondary',
        'bg-marine px-12 py-4 text-white font-medium rounded-md':
          this.variant === 'cta',
      }
    },
  },
}
</script>
