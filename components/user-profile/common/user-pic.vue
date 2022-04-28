<template>
  <div
    class="overflow-hidden flex-shrink-0 box relative min-w-full relative inline-block"
  >
    <div
      class="absolute inset-0 cursor-pointer"
      @click="openAvatarModal"
      @keydown="openAvatarModal"
    >
      <div class="wrapper" :style="{ backgroundImage: `url(${src})` }" />
    </div>
    <modal class="hidden md:block" name="userpic" height="auto">
      <img
        :src="src"
        alt=""
        class="min-w-max"
        @click="closeAvatarModal"
        @keydown="closeAvatarModal"
      />
    </modal>
    <modal class="md:hidden" name="userpic" width="100%" height="auto">
      <img
        :src="src"
        alt=""
        class="w-full"
        @click="closeAvatarModal"
        @keydown="closeAvatarModal"
      />
    </modal>
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
  methods: {
    openAvatarModal() {
      this.$modal.show('userpic')
    },
    closeAvatarModal() {
      this.$modal.hide('userpic')
    },
  },
}
</script>

<style scoped>
.box::before {
  content: '';
  display: block;
  padding-bottom: 100%;
}

.wrapper {
  float: left;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}
</style>
