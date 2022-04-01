<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Types of activities</h2>
      <ul>
        <li v-for="{ id, title } in values" :key="id">
          {{ title }}
        </li>
      </ul>
    </div>
  </div>
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
