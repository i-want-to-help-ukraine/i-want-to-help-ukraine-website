<template>
  <div>
    <div class="flex flex-col">
      <h2 class="text-2xl mb-2">Контактні дані</h2>
      <form-field label="Ім'я" required name="firstName" :errors="errors">
        <text-input
          :value="userInfo.firstName"
          name="firstName"
          :errors="errors"
          @onBlur="(value) => handleChange('firstName', value)"
        />
      </form-field>
      <form-field label="Прізвище" :errors="errors" required name="lastName">
        <text-input
          :value="userInfo.lastName"
          name="lastName"
          :errors="errors"
          @onBlur="(value) => handleChange('lastName', value)"
        />
      </form-field>
      <form-field label="Організація">
        <text-input
          :value="userInfo.organization"
          name="organization"
          :errors="errors"
          @onBlur="(value) => handleChange('organization', value)"
        />
      </form-field>
      <form-field label="Деталі" :errors="errors" required name="descrpition">
        <text-area
          :value="userInfo.description"
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
    defaultValues: {
      type: Object,
      default: () => {},
    },
    errors: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    userInfo: {},
  }),
  computed: {
    ...mapState(['auth']),
  },
  watch: {
    userInfo: {
      handler(userInfo) {
        this.$emit('handleChange', userInfo)
      },
      deep: true,
    },
  },
  beforeMount() {
    const { firstName, lastName, organization, description } = this.auth.user
    this.userInfo = { firstName, lastName, organization, description }
  },
  methods: {
    handleChange(key, value) {
      this.userInfo[key] = value
    },
  },
}
</script>
