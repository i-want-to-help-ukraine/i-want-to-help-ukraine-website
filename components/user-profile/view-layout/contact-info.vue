<template>
  <div>
    <p class="text-2xl mb-2">Contacts</p>
    <div
      v-for="{ id, provider, metadata } in contacts"
      :key="id"
      class="mb-2 flex"
    >
      <p class="capitalize text-lg mr-2">{{ provider.title }}:</p>
      <p class="text-lg">{{ metadata.value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    contacts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
