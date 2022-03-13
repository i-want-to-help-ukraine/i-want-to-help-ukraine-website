<template>
  <div class="rounded-full overflow-hidden flex-shrink-0">
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
