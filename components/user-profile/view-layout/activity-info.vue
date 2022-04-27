<template>
  <ul>
    <li v-for="{ id, title } in values" :key="id">
      {{ title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ActivityInfo',
  props: {
    values: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
