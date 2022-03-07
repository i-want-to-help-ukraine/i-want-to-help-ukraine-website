<template>
  <div>
    <div
      v-for="volunteer in volunteersList"
      :key="volunteer.name"
      class="notification ua-flag-bg mb-5 p-5 volunteer-card"
      @click="onVolunteerClick(volunteer)"
    >
      <div class="volunteer-card-content p-4">
        <b-image
          class="volunteer-avatar"
          :src="volunteer.picture"
          :alt="volunteer.name"
          :rounded="true"
        ></b-image>
        <div>
          <h5 class="is-size-5">
            {{ volunteer.name }}
          </h5>
          <p class="is-size-6">
            {{ volunteer.user_metadata.city }}
          </p>
          <div class="volunteer-social-medias">
            <a target="_blank" :href="volunteer.user_metadata.instagram">
              <b-image
                v-if="volunteer.user_metadata.instagram"
                class="volunteer-social-media-icon"
                :src="require(`@/assets/icons/instagram.svg`)"
                alt="instagram"
              >
              </b-image>
            </a>
            <a target="_blank" :href="volunteer.user_metadata.facebook">
              <b-image
                v-if="volunteer.user_metadata.facebook"
                class="volunteer-social-media-icon"
                :src="require(`@/assets/icons/facebook.svg`)"
                alt="facebook"
              >
              </b-image>
            </a>
          </div>
        </div>
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

.volunteer-avatar {
  width: 80px;
  height: 80px;
  margin-right: 16px;
}

.volunteer-social-medias {
  display: flex;
}

.volunteer-social-media-icon {
  width: 32px;
  height: 32px;
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
  border-radius: 8px;
  background-color: rgb(255 255 255 / 80%);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
}
</style>
