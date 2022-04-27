<template>
  <div>
    <p class="text-lg uppercase">
      {{ payment.provider.title }}
    </p>
    <div
      v-for="[key, value] in metadataMapped"
      :key="key"
      class="p-2 grid grid-cols-3"
    >
      <span class="col-span-1" v-if="key !== 'value'">{{ key }}</span>
      <a
        :href="value"
        class="col-span-2 whitespace-nowrap"
        v-if="payment.provider.title === 'send.monobank.ua'"
      >
        {{ value.length > 32 ? `${value.slice(0, 32)}...` : value }}
      </a>
      <span @click="onCopy(value)" @keydown="onCopy" v-else>
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
