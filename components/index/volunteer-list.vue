<template>
  <div>
    <div
      v-for="volunteer in volunteersList"
      :key="volunteer.name"
      class="notification ua-flag-bg mb-5 p-5 volunteer-card"
      @click="onVolunteerClick(volunteer)"
    >
      <div class="volunteer-card-content p-4">
        <h6 class="title is-size-6">
          {{ volunteer.name }}
        </h6>
        <p>
          <a target="_blank" href="">{{ volunteer.instagram }}</a>
        </p>
        <p>
          {{ volunteer.city }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VolunteerList',
  props: {
    volunteersList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onVolunteerClick(volunteer) {
      this.$emit('volunteer-selected', volunteer)
    },
  },
}
</script>

<style>
.volunteer-card {
  cursor: pointer;
}

.ua-flag-bg {
  background: rgb(0 91 194 / 50%);
  background: linear-gradient(
    90deg,
    rgb(0 91 194 / 50%) 38%,
    rgb(255 212 0 / 50%) 100%
  );
}

.volunteer-card-content {
  border-radius: 5px;
  background-color: rgb(255 255 255 / 80%);
  backdrop-filter: blur(10px);
}
</style>
