<template>
  <div class="flex flex-col">
    <h2 class="text-2xl">Приймаю платежі на...</h2>
    <error-message :error="errors && errors.payments" class="mb-2" />
    <form-field
      v-for="item in payments"
      :key="item.id"
      :label="item.provider.title"
      :name="item.provider.title"
      removable
      :errors="errors"
      @onRemove="handleRemove"
    >
      <text-input
        :value="item.metadata && item.metadata.value"
        :name="item.provider.title"
        :errors="errors"
        :readonly="!item.editable"
        @onBlur="(value) => handleInput(item, value)"
      />
    </form-field>
    <add-field-select
      label="Payment service"
      :options="providersOptions"
      placeholder="Select..."
      @onInput="handleAddProvider"
    />
  </div>
</template>

<script>
import {
  AddFieldSelect,
  FormField,
  TextInput,
  ErrorMessage,
} from '../../UI/index.js'
import { GET_PAYMENT_PROVIDERS } from '../../../graphql'
export default {
  name: 'PaymentInfo',
  components: { FormField, TextInput, AddFieldSelect, ErrorMessage },
  props: {
    defaultValues: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    payments: [],
  }),
  computed: {
    providersOptions() {
      let mapped = null
      let used = null

      if (!this.paymentProviders || !this.paymentProviders.length) return []

      mapped = this.paymentProviders.map(({ title }) => ({ label: title }))
      used = this.payments.map(({ provider }) => provider.title)

      return mapped.filter(({ label }) => !used.includes(label))
    },
  },
  watch: {
    payments: {
      handler(payments) {
        this.$emit('handleChange', { payments })
      },
      deep: true,
    },
  },
  beforeMount() {
    this.payments = [...this.defaultValues]
  },
  apollo: {
    paymentProviders: {
      query: GET_PAYMENT_PROVIDERS,
      prefetch: true,
    },
  },
  methods: {
    handleAddProvider({ label }) {
      const provider = this.paymentProviders.find(
        ({ title }) => title === label
      )

      if (provider)
        this.payments.push({
          provider,
          editable: true,
        })
    },
    handleInput(item, value) {
      const array = [...this.payments]
      const index = array.findIndex(
        ({ provider }) => provider.title === item.provider.title
      )

      array[index] = {
        ...item,
        metadata: { value },
      }
      this.payments = [...array]
    },
    handleRemove(name) {
      this.payments = this.payments.filter(
        ({ provider }) => provider.title !== name
      )
    },
  },
}
</script>
