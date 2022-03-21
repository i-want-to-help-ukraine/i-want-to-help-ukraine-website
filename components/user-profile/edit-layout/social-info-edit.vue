<template>
  <div class="flex flex-col">
    <h2 class="text-2xl">Соціальні мережі</h2>
    <error-message :error="errors && errors.social" class="mb-2" />

    <template v-for="item in social">
      <form-field
        v-if="item.provider"
        :key="item.id || item.provider.title"
        :label="item.provider.title"
        :name="item.provider.title"
        removable
        :errors="errors"
        @onRemove="handleRemove"
      >
        <text-input
          :value="item.url"
          :name="item.provider.title"
          :errors="errors"
          @onBlur="(value) => handleInput(item, value)"
        />
      </form-field>
    </template>
    <add-field-select
      label="Link"
      :options="providersOptions"
      placeholder="Select..."
      @onInput="handleAddContact"
    />
  </div>
</template>

<script>
import { GET_SOCIAL_PROVIDERS } from '../../../graphql'
import { ErrorMessage, FormField, TextInput, AddFieldSelect } from '../../UI'

export default {
  name: 'SocialInfo',
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
    social: [],
    addSelectView: false,
  }),
  computed: {
    providersOptions() {
      let mapped = null
      let used = null

      if (!this.socialProviders || !this.socialProviders.length) return []

      mapped = this.socialProviders.map(({ title }) => ({ label: title }))
      used = this.social.map(({ provider }) => provider.title)

      return mapped.filter(({ label }) => !used.includes(label))
    },
  },
  watch: {
    social: {
      handler(social) {
        this.$emit('handleChange', { social })
      },
      deep: true,
    },
  },
  beforeMount() {
    this.social = [...this.defaultValues]
  },
  methods: {
    handleInput(item, url) {
      const array = [...this.social]
      const index = array.findIndex(
        ({ provider }) => provider.id === item.provider.id
      )
      array[index] = { ...item, url }
      this.social = [...array]
    },
    handleAddContact({ label }) {
      const provider = this.socialProviders.find(({ title }) => title === label)

      if (provider)
        this.social.push({
          provider,
        })
    },
    handleRemove(name) {
      this.social = this.social.filter(
        ({ provider }) => provider.title !== name
      )
    },
  },
  apollo: {
    socialProviders: {
      prefetch: true,
      query: GET_SOCIAL_PROVIDERS,
    },
  },
}
</script>
