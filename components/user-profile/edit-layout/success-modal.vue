<template>
  <modal name="success" height="auto" width="100%">
    <div class="p-8 w-full sm:w-auto rounded-md bg-white box-border mx-2">
      <p class="text-2xl font-bold mb-4">Успішно!</p>
      <p>
        Твої дані передано модераторам.
        <br />
        Твоя анкета стане доступна після підтвердження.
        <br />
        Розгляд анкети може займати до 48 годин.
      </p>
      <div class="flex justify-end mt-8">
        <custom-button variant="primary" @handleClick="handleClick">
          Ok
        </custom-button>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import CustomButton from '../../UI/custom-button.vue'

export default {
  name: 'SuccessModal',
  components: {
    CustomButton,
  },
  methods: {
    handleClick() {
      if (this.user) this.$router.push(`/user-profile/${this.user.id}`)
      this.$modal.hide('success')
    },
  },
  computed: {
    ...mapState({
      user: ({ auth }) => auth.user,
    }),
  },
}
</script>
