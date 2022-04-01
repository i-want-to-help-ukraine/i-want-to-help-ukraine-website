<template>
  <router-link
    class="text-white my-2 font-semibold text-3xl"
    :to="to"
    @click.native="$emit('onClick')"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'MenuLink',
  props: {
    to: {
      type: String,
      default: '',
    },
  },
}
</script>
