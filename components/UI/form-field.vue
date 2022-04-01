<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for -->
  <label class="flex flex-col mb-4 capitalize">
    <p class="mb-1 capitalize">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </p>
    <div class="relative">
      <slot></slot>
      <button
        v-if="removable"
        class="absolute right-1 top-[50%] translate-y-[-50%] transform w-4 h-4 opacity-40"
        @click="$emit('onRemove', name)"
      >
        <img :src="closeIcon" alt="" />
      </button>
    </div>
    <error-message :error="errors && errors[name]" />
  </label>
</template>

<script>
import closeIcon from '@/assets/icons/close-icon.svg'
import ErrorMessage from './error-message.vue'

export default {
  name: 'FormField',
  components: { ErrorMessage },
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    removable: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    closeIcon: () => closeIcon,
  },
}
</script>
