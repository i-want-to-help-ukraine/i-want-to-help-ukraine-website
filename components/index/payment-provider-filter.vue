<template>
  <v-select
    v-if="paymentProviders && paymentProviders.length"
    :options="paymentProviders.map(({ title }) => title)"
    :model="selectedPaymentProviders"
    placeholder="Payment Provider"
    class="capitalize w-full sm:w-56"
    multiple
    @input="onSelect"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PaymentProviderFilter',
  props: {
    paymentProviders: {
      type: Array,
      default: () => [],
    },
  },
  computed: mapState({
    selectedPaymentProviders: ({ volunteers }) =>
      volunteers.selectedPaymentProviders,
  }),
  methods: {
    onSelect(values) {
      const ids = values.map((item) => {
        const { id } = this.paymentProviders.find(({ title }) => title === item)
        return id
      })

      this.$store.dispatch('volunteers/setSelectedPaymentProviders', ids)
    },
  },
}
</script>
