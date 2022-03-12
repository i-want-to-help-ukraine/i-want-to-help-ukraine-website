<template>
  <v-seltect
    :options="volunteers.categories"
    :model="volunteers.selectedCategory"
    :reduce="onSelect"
    placeholder="Category"
    class="capitalize w-full sm:w-56"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    styles: {
      type: String,
      default: '',
    },
  },
}
</script>
