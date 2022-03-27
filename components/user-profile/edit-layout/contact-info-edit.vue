<template>
  <div class="flex flex-col">
    <h2 class="text-2xl">
      Контакти
      <span class="text-danger">*</span>
    </h2>
    <error-message :error="errors && errors.contacts" class="mb-2" />
    <template v-for="item in contact">
      <form-field
        v-if="item.provider"
        :key="item.provider.title"
        :label="item.provider.title"
        :name="item.provider.title"
        removable
        :errors="errors"
        @onRemove="handleRemove"
      >
        <text-input
          v-if="item.provider"
          :value="item.metadata ? item.metadata.value : ''"
          :name="item.provider.title"
          :errors="errors"
          :placeholder="placeholders[item.provider.title]"
          @onBlur="(value) => handleInput(item, value)"
        />
      </form-field>
    </template>
    <add-field-select
      label="Contact"
      :options="providersOptions"
      placeholder="Select..."
      @onInput="handleAddContact"
    />
  </div>
</template>

<script>
import { GET_CONTACT_PROVIDERS } from '../../../graphql'
import AddFieldSelect from '../../UI/add-field-select.vue'
import { ErrorMessage, FormField, TextInput } from '../../UI'

export default {
  name: 'ContactInfo',
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
    contact: [],
    addSelectView: false,
    placeholders: {
      phone: '380XXXXXXXXX',
      email: 'example@mail.com',
    },
  }),
  computed: {
    providersOptions() {
      let mapped = null
      let used = null

      if (!this.contactProviders || !this.contactProviders.length) return []

      mapped = this.contactProviders.map(({ title }) => ({ label: title }))
      used = this.contact.map(({ provider }) => provider.title)

      return mapped.filter(({ label }) => !used.includes(label))
    },
  },
  watch: {
    contact: {
      handler(contact) {
        this.$emit('handleChange', { contacts: contact })
      },
      deep: true,
    },
  },
  beforeMount() {
    this.contact = [...this.defaultValues]
  },
  methods: {
    handleInput(item, value) {
      const array = [...this.contact]
      const index = array.findIndex(
        ({ provider }) => provider.title === item.provider.title
      )

      array[index] = {
        ...item,
        metadata: { value },
      }
      this.contact = [...array]
    },
    handleAddContact({ label }) {
      const provider = this.contactProviders.find(
        ({ title }) => title === label
      )

      if (provider)
        this.contact.push({
          provider,
        })
    },
    handleRemove(name) {
      this.contact = this.contact.filter(
        ({ provider }) => provider.title !== name
      )
    },
  },
  apollo: {
    contactProviders: {
      prefetch: true,
      query: GET_CONTACT_PROVIDERS,
    },
  },
}
</script>
