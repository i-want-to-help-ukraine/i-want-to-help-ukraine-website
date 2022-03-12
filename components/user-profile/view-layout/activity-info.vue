<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Activities Information</h2>
      <div
        v-for="{ id, title } in values"
        :key="id"
        class="grid grid-cols-4 mb-2"
      >
        <p class="font-medium col-span-3">
          {{ title }}
        </p>
      </div>
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
