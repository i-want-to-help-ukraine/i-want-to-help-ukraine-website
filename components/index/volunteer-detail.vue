<template>
  <div class="notification">
    <div v-if="!volunteerDetail">Please select volunteer</div>

    <div v-if="volunteerDetail">
      <h4 class="title is-size-4">{{ volunteerDetail.name }}</h4>
      <p class="subtitle is-size-6">
        <a href="">{{ volunteerDetail.instagram }}</a>
      </p>

      <div class="content">
        <h5 class="title is-size-5">Donate options</h5>
        <div class="block">
          <h6 class="title is-size-6">Bitcoin:</h6>
          <p>bc1q3wjewwcny0g43u47rzu08mn0fvkkj35g4u6xtk</p>
          <a href="">How to send Bitcoin?</a>
        </div>
        <div class="block">
          <h6 class="title is-size-6">Credit card credentials:</h6>
          <p>
            Maria Pevchikh <br />
            3453 4545 3334 5454
          </p>
          <a href="">How to send to credit card?</a>
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
