<template>
  <v-select
    v-if="showSelect"
    :options="options"
    :placeholder="placeholder"
    class="capitalize w-full"
    @input="handleSelect"
  />
  <custom-button
    v-else
    variant="primary"
    @click="toggleSelect"
  >
    + {{ label }}
  </custom-button>
</template>

<script>
import customButton from './custom-button.vue'
export default {
  components: { customButton },
  name: 'AddFieldSelect',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showSelect: false,
    }
  },
  methods: {
    toggleSelect() {
      this.showSelect = !this.showSelect
    },
    handleSelect(event) {
      this.$emit('onInput', event)
      this.toggleSelect()
    },
  },
}
</script>
