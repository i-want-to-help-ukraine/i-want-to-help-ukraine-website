<template>
  <div class="flex flex-col">
    <h2 class="text-2xl mb-2">Ways to donate</h2>
    <div class="flex items-center flex-wrap">
      <payment-button
        v-for="{ id, metadata, provider } in payments"
        :key="id"
        class="mt-2 sm:mt-0 mr-2"
        :provider="provider"
        :value="formatValue(provider.title, metadata.value || metadata.url)"
      />
    </div>
  </div>
</template>

<script>
import paymentButton from './payment-button.vue'
export default {
  name: 'PaymentInfo',
  components: { paymentButton },
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    formatValue(name, value) {
      if (name === 'Bank card') return value?.match(/\d{4}/g).join(' ')
      return value
    },
  },
}
</script>
