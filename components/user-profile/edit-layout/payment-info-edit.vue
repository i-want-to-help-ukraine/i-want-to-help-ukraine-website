<template>
  <div class="flex flex-col">
    <h2 class="text-2xl">
      Приймаю платежі на...
      <span class="text-danger">*</span>
    </h2>
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
        @onInput="(value) => handleInput(item, value)"
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
import { mapState } from 'vuex'
import { AddFieldSelect, FormField, TextInput, ErrorMessage } from '../../UI'
import { GET_PAYMENT_PROVIDERS } from '../../../graphql'

export default {
  name: 'PaymentInfo',
  components: { FormField, TextInput, AddFieldSelect, ErrorMessage },
  props: {
    errors: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    providersOptions() {
      let mapped = null
      let used = null

      if (!this.paymentProviders || !this.paymentProviders.length) return []

      mapped = this.paymentProviders.map(({ title }) => ({ label: title }))
      used = this.payments.map(({ provider }) => provider.title)

      return mapped.filter(({ label }) => !used.includes(label))
    },
    ...mapState({
      payments: ({ auth }) => auth.userForm?.payments || [],
    }),
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

      const item = {
        provider,
        editable: true,
      }

      if (provider) this.handleChange([...this.payments, item])
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
      this.handleChange(array)
    },
    handleRemove(name) {
      const filtered = this.payments.filter(
        ({ provider }) => provider.title !== name
      )
      this.handleChange(filtered)
    },
    handleChange(payments) {
      this.$store.dispatch('auth/handleChangeUserForm', { payments })
    },
  },
}
</script>
