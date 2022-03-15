<template>
  <!-- <div class="flex"> -->
  <!-- <span class="mr-2"> Account status: </span> -->
  <div :class="[classObject, 'rounded-full px-2 shadow']">
    <span class="capitalize font-medium">
      {{ value }}
    </span>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'AccountStatus',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    classObject() {
      const { value } = this
      return {
        'bg-lemon': value === 'requested' || value === 'in progress',
        'bg-red-500': value === 'banned',
        'bg-green-500': value === 'verified',
      }
    },
  },
}
</script>
