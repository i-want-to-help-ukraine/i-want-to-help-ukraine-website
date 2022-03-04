<template>
  <div class="notification is-success">
    <div class="block">
      <h4 class="title is-size-4">{{ volunteerDetail.name }}</h4>
      <p class="subtitle is-size-6">
        <a
          ref="noopener noreferrer nofollow"
          :href="volunteerDetail.instagram"
          target="_blank"
        >
          {{ volunteerDetail.instagram }}
        </a>
      </p>
    </div>

    <div class="block">
      <p class="is-size-5">Donate options:</p>
      <div
        v-for="donateOption in volunteerDetail.moneyTransferOptions"
        :key="donateOption.id"
      >
        <div v-if="donateOption.type === 'debit-card'">
          <p class="is-size-6 has-text-weight-bold mt-3">Debit card</p>
          <p
            v-for="credential in donateOption.credentials"
            :key="credential.label"
          >
            {{ credential.label }}: {{ credential.value }}
          </p>
        </div>
        <div v-if="donateOption.type === 'bitcoin'" class="mt-3">
          <p class="is-size-6 has-text-weight-bold mt-3">Bitcoin</p>
          <p
            v-for="credential in donateOption.credentials"
            :key="credential.label"
          >
            {{ credential.label }}: {{ credential.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VolunteerDetail',
  props: {
    volunteerDetail: {
      type: Object,
      default: null,
    },
  },
}
</script>
