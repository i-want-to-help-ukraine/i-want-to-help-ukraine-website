<template>
  <button
    class="text-base mx-2 text-marine font-medium"
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
      console.log(this.path)
      this.$router.push(this.path)
    },
  },
}
</script>
