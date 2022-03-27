<template>
  <button
    class="text-base text-marine font-medium"
    @click="path ? handleClick() : $emit('handleClick')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ProfileHeaderButton',
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    path: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick() {
      this.$router.push(this.path)
    },
  },
}
</script>
