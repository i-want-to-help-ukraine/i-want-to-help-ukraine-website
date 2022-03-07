<template>
  <div ref="container"></div>
</template>

<script>
import { mount } from '@vue/test-utils'
export default {
  name: 'NodeElement',
  props: {
    node: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    const node = mount(this.node, {
      ...this.options,
    })

    this.$refs.container.replaceWith(node.vm.$el)
  },
}
</script>
