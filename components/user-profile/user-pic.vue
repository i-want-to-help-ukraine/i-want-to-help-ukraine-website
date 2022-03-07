<template>
  <div class="rounded-full overflow-hidden w-44 h-44">
    <img :src="image" alt="User Avatar" class="h-full w-full object-cover" />
  </div>
</template>

<script>
export default {
  name: 'UserPic',
  props: {
    image: {
      type: String,
      default: '',
    },
  },
}
</script>
