<template>
  <div class="container">
    <div class="block">
      <SearchFilters />
    </div>

    <div class="block">
      <div class="columns">
        <div class="column is-three-quarters is-centered">
          <div class="columns">
            <div class="column is-three-quarters">
              <VolunteerList @volunteer-selected="onVolunteerSelected" />
            </div>
            <div class="column">
              <VolunteerDetail :volunteer-detail="currentVolunteer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilters from '../components/index/search-filters'
import VolunteerDetail from '../components/index/volunteer-detail'
import VolunteerList from '../components/index/volunteer-list'

export default {
  name: 'IndexPage',
  components: { VolunteerDetail, SearchFilters, VolunteerList },
  data() {
    return {
      currentVolunteer: null,
      volunteers: [
        {
          name: 'Maria Pevchikh',
          instagram: 'https://www.instagram.com/maria_pevchikh/',
          city: 'Kyiv',
        },
        {
          name: 'Maria Marchenko',
          instagram: 'http://instagram.com/asfasdfasf',
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
    onVolunteerSelected(selectedVolunteer) {
      this.currentVolunteer = selectedVolunteer
    },
  },
}
</script>
