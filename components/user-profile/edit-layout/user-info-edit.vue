<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Контактні дані (англійською)</h2>
      <form-field label="Ім'я" required name="firstName" :errors="errors">
        <text-input
          :value="userForm.firstName"
          name="firstName"
          :errors="errors"
          @onBlur="(value) => handleChange('firstName', value)"
        />
      </form-field>
      <form-field label="Прізвище" :errors="errors" required name="lastName">
        <text-input
          :value="userForm.lastName"
          name="lastName"
          :errors="errors"
          @onBlur="(value) => handleChange('lastName', value)"
        />
      </form-field>
      <form-field label="Організація">
        <text-input
          :value="userForm.organization"
          name="organization"
          :errors="errors"
          @onBlur="(value) => handleChange('organization', value)"
        />
      </form-field>
      <form-field
        label="Опис діяльності"
        :errors="errors"
        required
        name="descrpition"
      >
        <text-area
          :value="userForm.description"
          name="description"
          :errors="errors"
          placeholder="Розкажіть трохи про себе, мінімум 100 символів"
          @onInput="(value) => handleChange('description', value)"
        />
      </form-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FormField from '../../UI/form-field.vue'
import TextArea from '../../UI/text-area.vue'
import TextInput from '../../UI/text-input.vue'

export default {
  name: 'UserInfo',
  components: { TextInput, FormField, TextArea },
  props: {
    errors: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      userForm: ({ auth }) => auth.userForm,
    }),
  },
  methods: {
    handleChange(key, value) {
      this.$store.dispatch('auth/handleChangeUserForm', { [key]: value })
    },
  },
}
</script>
