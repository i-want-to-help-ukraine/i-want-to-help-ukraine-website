<template>
  <div class="flex flex-col">
    <h2 class="text-2xl mb-2">Social Links</h2>
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
            value: socialInfo[name],
          },
          listeners: { onInput: (value) => (socialInfo[name] = value) },
        }"
      />
    </div>
  </div>
</template>

<script>
import { NodeElement } from '../../UI/index.js'
export default {
  name: 'SocialInfo',
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
    socialInfo: {},
  }),
  watch: {
    socialInfo: {
      handler(socialInfo) {
        this.$emit('handleChange', { socialInfo })
      },
      deep: true,
    },
  },
  beforeMount() {
    this.socialInfo = { ...this.defaultValues }
  },
}
</script>
