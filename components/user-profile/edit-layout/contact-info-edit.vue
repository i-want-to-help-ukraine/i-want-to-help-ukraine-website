<template>
  <div class="flex flex-col">
    <h2 class="text-2xl block">
      <p>
        Контакти
        <span class="text-danger">*</span>
      </p>
      <p class="text-xs">Бачите тільки Ви</p>
    </h2>
    <error-message :error="errors && errors.contacts" class="mb-2" />
    <template v-for="item in contacts">
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
          :readonly="!item.editable"
          @onInput="(value) => handleInput(item, value)"
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
import { mapState } from 'vuex'
import { GET_CONTACT_PROVIDERS } from '../../../graphql'
import AddFieldSelect from '../../UI/add-field-select.vue'
import { ErrorMessage, FormField, TextInput } from '../../UI'

export default {
  name: 'ContactInfo',
  components: { FormField, TextInput, AddFieldSelect, ErrorMessage },
  props: {
    errors: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
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
      used = this.contacts.map(({ provider }) => provider.title)

      return mapped.filter(({ label }) => !used.includes(label))
    },
    ...mapState({
      contacts: ({ auth }) => auth.userForm?.contacts || [],
    }),
  },
  methods: {
    handleInput(item, value) {
      const array = [...this.contacts]
      const index = array.findIndex(
        ({ provider }) => provider.title === item.provider.title
      )

      array[index] = {
        ...item,
        metadata: { value },
      }

      this.handleChange(array)
    },
    handleAddContact({ label }) {
      const provider = this.contactProviders.find(
        ({ title }) => title === label
      )

      const item = {
        provider,
        editable: true,
      }

      if (provider) this.handleChange([...this.contacts, item])
    },
    handleRemove(name) {
      const filtered = this.contacts.filter(
        ({ provider }) => provider.title !== name
      )
      this.handleChange(filtered)
    },
    handleChange(contacts) {
      this.$store.dispatch('auth/handleChangeUserForm', { contacts })
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
