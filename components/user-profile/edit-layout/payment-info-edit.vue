<template>
  <div class="flex flex-col">
    <h2 class="text-2xl mb-2">Payment Methods</h2>
    <div
      v-for="{ label, name, component } in schema"
      :key="name"
      class="flex flex-col mb-2"
    >
      <label class="mb-1" :for="name">{{ label }}:</label>
      <node-element
        :node="component"
        :options="{
          propsData: {
            value: paymentInfo[name],
          },
          listeners: { onInput: (value) => (paymentInfo[name] = value) },
        }"
      />
    </div>
  </div>
</template>

<script>
import NodeElement from '../../UI/node-element.vue'
export default {
  name: 'PaymentInfo',
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
    paymentInfo: {},
  }),
  watch: {
    paymentInfo: {
      handler(paymentInfo) {
        this.$emit('handleChange', { paymentInfo })
      },
      deep: true,
    },
  },
  beforeMount() {
    this.paymentInfo = { ...this.defaultValues }
  },
}
</script>
