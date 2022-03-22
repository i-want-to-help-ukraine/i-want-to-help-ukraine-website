<template>
    <div class="items-center h-full">
      <!-- <label class="mb-1 mr-2 flex" :for="provider.title">
        {{ provider.title }}:
      </label> -->
      <a
        v-if="provider.title === 'send.monobank.ua'"
        :href="value"
        target="_blank"
        class="w-24 h-12 overflow-hidden flex items-center rounded-md"
      >
        <img
          :src="require(`@/assets/icons/monobank.jpeg`)"
          alt=""
          class="w-full"
        />
      </a>
      <div v-else class="block w-max h-full relative">
        <custom-button
          variant="primary-outline"
          class="h-full flex items-center  text-[#000]"
          @handleClick="() => onCopy(value)"
        >
          <img :src="require('@/assets/icons/card.png')" class="mr-2"> 
          {{ value }}
        </custom-button>
        <div v-if="copied" class="bg-[#000] opacity-60 p-2 flex rounded absolute bottom-0 h-full w-full">
          <p class="text-white font-medium">Copied to clipboard</p>
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
      default: ''
    },
    provider: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    copied: false
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
    }
  },
}
</script>