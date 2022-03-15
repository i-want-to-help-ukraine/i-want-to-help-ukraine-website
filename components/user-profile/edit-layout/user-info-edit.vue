<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Contact Information</h2>
      <div
        v-for="{ label, name, component, options } in schema"
        :key="name"
        class="flex flex-col mb-2"
      >
        <label class="mb-1" :for="name">{{ label }}:</label>
        <node-element :node="component" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
import { NodeElement } from '../../UI/index.js'
export default {
  name: 'UserInfo',
  components: { NodeElement },
  props: {
    defaultValues: {
      type: Object,
      default: () => {},
    },
    schema: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    userInfo: {},
  }),
  watch: {
    userInfo: {
      handler(userInfo) {
        this.$emit('handleChange', { userInfo })
      },
      deep: true,
    },
  },
  beforeMount() {
    this.userInfo = { ...this.defaultValues }
  },
}
</script>
