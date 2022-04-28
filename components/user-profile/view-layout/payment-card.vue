<template>
  <div>
    <p class="text-lg">
      {{ payment.provider.title }}
    </p>
    <div
      v-for="[key, value] in metadataMapped"
      :key="key"
      class="p-2 grid grid-cols-3"
    >
      <span class="col-span-1" v-if="key !== 'value'">{{ key }}</span>
      <a
        v-if="payment.provider.title === 'send.monobank.ua'"
        target="_blank"
        :href="value.includes('//') ? value : '//' + value"
        class="col-span-3 break-all font-bold"
      >
        {{ value.length > 32 ? `${value.slice(0, 32)}...` : value }}
      </a>
      <span v-else class="font-bold" @click="onCopy(value)" @keydown="onCopy">
        {{ value }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentCard',
  props: {
    payment: {
      type: Object,
      default: () => ({
        metadata: {},
      }),
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
  computed: {
    metadataMapped() {
      if (this.payment.metadata) return Object.entries(this.payment.metadata)
      return []
    },
  },
}
</script>
