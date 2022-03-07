<template>
  <button
    :class="['py-2 px-4 rounded', typeToStyle()]"
    :type="type"
    @click="$emit('onClick')"
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
        'bg-cyan-500 text-white': this.type === 'submit',
      }
    },
  },
}
</script>
