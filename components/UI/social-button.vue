<template>
  <a
    target="_blank"
    :href="href.includes('//') ? href : '//' + href"
    class="social-button"
  >
    <img class="w-14 hover:brightness-90" :src="icon" :alt="type" />
  </a>
</template>

<script>
import instagram from '@/assets/icons/instagram.svg'
import facebook from '@/assets/icons/facebook.svg'

export default {
  name: 'SocialButton',
  props: {
    href: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    icon() {
      const typeToIcon = { instagram, facebook }

      return typeToIcon[this.type]
    },
  },
}
</script>
