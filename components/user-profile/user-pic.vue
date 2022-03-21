<template>
  <div
    class="border-gunsmoke bg-grey rounded-full overflow-hidden flex-shrink-0 relative w-[200px] h-[200px]"
  >
    <img
      class="w-max cursor-pointer"
      :src="src"
      alt="Choose photo"
      @click="openAvatarModal"
    />
    <modal class="hidden md:block" name="userpic" width="800" height="auto">
      <img :src="src" alt="" class="w-full" @click="closeAvatarModal" />
    </modal>
    <modal class="md:hidden" name="userpic" width="100%" height="auto">
      <img :src="src" alt="" class="w-full" @click="closeAvatarModal" />
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
