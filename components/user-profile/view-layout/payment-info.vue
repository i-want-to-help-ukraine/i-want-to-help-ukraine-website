<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Payment Information</h2>
      <div
        v-for="{ label, name } in schema"
        :key="name"
        class="grid grid-cols-4 mb-2"
      >
        <label class="mb-1 mr-2 col-span-1" :for="name">{{ label }}:</label>
        <p class="font-medium col-span-3">
          {{ formatNumber(name, values[name]) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentInfo',
  props: {
    values: {
      type: Object,
      default: () => {},
    },
    schema: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatNumber(name, value) {
      if (name === 'card') return value?.match(/\d{4}/g).join(' ')
      return value
    },
  },
}
</script>
