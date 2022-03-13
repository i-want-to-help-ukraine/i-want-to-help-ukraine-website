<template>
  <img :src="currentFlag" :alt="`${code} flag`" />
</template>

<script>
import ua from '../../assets/icons/flag-ua.svg'
import us from '../../assets/icons/flag-usa.svg'
import fr from '../../assets/icons/flag-fr.svg'
import gr from '../../assets/icons/flag-gr.svg'
import sp from '../../assets/icons/flag-sp.svg'
import ru from '../../assets/icons/flag-ru.svg'

export default {
  name: 'FlagIcon',
  props: {
    code: {
      type: String,
      default: 'ua',
    },
  },
  computed: {
    currentFlag() {
      const codeToIcon = { ua, us, fr, gr, sp, ru }

      return codeToIcon[this.code]
    },
  },
}
</script>
