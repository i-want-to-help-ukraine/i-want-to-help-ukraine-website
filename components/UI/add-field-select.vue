<template>
  <v-select
    v-if="showSelect"
    :options="options"
    :placeholder="placeholder"
    class="capitalize w-full"
    @input="handleSelect"
  />
  <button
    v-else
    class="p-2 text-blue font-semibold bg-marine rounded text-sm"
    @click="toggleSelect"
  >
    + {{ label }}
  </button>
</template>

<script>
export default {
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
