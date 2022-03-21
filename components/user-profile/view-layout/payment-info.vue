<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Payment Information</h2>
      <div
        v-for="{ id, provider, metadata } in payments"
        :key="id"
        class="items-center mb-4"
      >
        <label class="mb-1 mr-2 flex" :for="provider.title"
          >{{ provider.title }}:</label
        >
        <a
          v-if="provider.title === 'send.monobank.ua'"
          :href="metadata.value || metadata.url"
          target="_blank"
          class="w-24 h-12 overflow-hidden flex items-center rounded-md"
        >
          <img
            :src="require(`@/assets/icons/monobank.jpeg`)"
            alt=""
            class="w-full"
          />
        </a>
        <p
          v-else
          class="font-medium bg-marine text-white rounded-md h-12 leading-10 px-2 py-1 w-max"
        >
          {{ formatValue(provider.title, metadata.value || metadata.url) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentInfo',
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatValue(name, value) {
      if (name === 'Bank card') return value?.match(/\d{4}/g).join(' ')
      return value
    },
  },
}
</script>
