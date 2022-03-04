<template>
  <div>
    <div
      v-for="volunteer in volunteers"
      :key="volunteer.name"
      class="notification mb-5 p-5 volunteer-card"
      @click="onVolunteerClick(volunteer)"
    >
      <h6 class="title is-size-6">
        {{ volunteer.name }}
      </h6>
      <a target="_blank" href="">{{ volunteer.instagram }}</a>
      <p>
        {{ volunteer.city }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      volunteers: [
        {
          name: 'Maria Pevchikh',
          instagram: 'https://www.instagram.com/maria_pevchikh/',
          city: 'Kyiv',
        },
        {
          name: 'Tatiana',
          instagram: 'http://instagram.com/k345u3485',
          city: 'Kharkiv',
        },
        {
          name: 'Elena',
          instagram: 'http://instagram.com/lllllalsldf',
          city: 'Kyiv',
        },
      ],
    }
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

.bg-blue {
  background-color: #008afb;
}

.bg-yellow {
  background-color: #ffd900;
}
</style>
