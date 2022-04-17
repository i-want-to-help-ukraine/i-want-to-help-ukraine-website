<template>
  <div class="items-center h-full payment-button">
    <a
      v-if="provider.title === 'send.monobank.ua'"
      :href="value.includes('//') ? value : '//' + value"
      target="_blank"
      class="w-24 h-12 overflow-hidden flex items-center rounded-md hover:brightness-90"
    >
      <img
        :src="require(`@/assets/icons/monobank.jpeg`)"
        :alt="`${provider.title}`"
        class="w-full"
      />
    </a>
    <div
      v-else-if="provider.title === 'PayPal'"
      class="block w-max h-full relative hover:brightness-90"
    >
      <custom-button
        variant="primary-outline"
        class="h-full flex items-center text-[#000]"
        @handleClick="() => onCopy(value)"
      >
        <div class="w-7 h-7">
          <img
            :src="require('@/assets/icons/paypal.png')"
            class="mr-2"
            :alt="`${provider.title}`"
          />
        </div>
        PayPal
      </custom-button>
      <div
        :class="[
          'bg-[#000] opacity-80 p-2 justify-center rounded absolute bottom-0 left-0 h-full w-max duration-150 hover:brightness-90',
          copied ? 'flex' : 'hidden',
        ]"
      >
        <p class="text-white text-center font-medium">Copied to clipboard</p>
      </div>
    </div>
    <div v-else class="block w-max h-full relative">
      <custom-button
        variant="primary-outline"
        class="h-full flex items-center text-[#000]"
        @handleClick="() => onCopy(value)"
      >
        <img
          :src="require('@/assets/icons/card.png')"
          class="mr-2"
          :alt="`${provider.title}`"
        />
        VISA / MC
      </custom-button>
      <div
        :class="[
          'bg-[#000] opacity-80 p-2 justify-center rounded absolute bottom-0 left-0 h-full w-max duration-150',
          copied ? 'flex' : 'hidden',
        ]"
      >
        <p class="text-white text-center font-medium">Copied to clipboard</p>
      </div>
    </div>
  </div>
</template>

<script>
import customButton from '../../UI/custom-button.vue'

export default {
  name: 'PaymentButton',
  components: { customButton },
  props: {
    value: {
      type: String,
      default: '',
    },
    provider: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    copied: false,
  }),
  watch: {
    copied() {
      setTimeout(() => {
        this.copied = false
      }, 3000)
    },
  },
  methods: {
    onCopy(value) {
      this.$copyText(value).then(() => {
        this.copied = true
      })
    },
  },
}
</script>
