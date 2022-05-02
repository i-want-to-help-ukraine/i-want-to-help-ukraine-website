<template>
  <div class="">
    <h2 class="text-2xl mb-2">Ways to donate</h2>
    <div class="flex flex-col">
      <payment-card
        class="mb-2"
        v-for="payment in payments"
        :key="payment.id"
        :payment="payment"
      />
    </div>
  </div>
</template>

<script>
import PaymentCard from './payment-card.vue'

export default {
  name: 'PaymentInfo',
  components: { PaymentCard },
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
