<template>
  <div
    class="rounded-full overflow-hidden w-16 h-16 sm:w-44 sm:h-44 flex-shrink-0"
  >
    <img :src="src" alt="User Avatar" class="h-full w-full object-cover" />
  </div>
</template>

<script>
export default {
  name: 'UserPic',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
}
</script>
