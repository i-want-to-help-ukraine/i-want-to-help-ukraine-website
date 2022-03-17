<template>
  <div class="flex">
    <city-filter :cities="cities" />
    <activity-filter :activities="activities" class="ml-2" />
    <social-provider-filter :social-providers="socialProviders" class="ml-2" />
    <payment-provider-filter
      :payment-providers="paymentProviders"
      class="ml-2"
    />
    <contact-provider-filter
      :contact-providers="contactProviders"
      class="ml-2"
    />
  </div>
</template>

<script>
import {
  GET_CITIES,
  GET_ACTIVITIES,
  GET_PAYMENT_PROVIDERS,
  GET_SOCIAL_PROVIDERS,
  GET_CONTACT_PROVIDERS,
} from '../../graphql'
import CityFilter from './city-filter.vue'
import ActivityFilter from './activity-filter.vue'
import SocialProviderFilter from './social-provider-filter'
import PaymentProviderFilter from './payment-provider-filter'
import ContactProviderFilter from './contact-provider-filter'

export default {
  name: 'SearchFilters',
  components: {
    CityFilter,
    ActivityFilter,
    SocialProviderFilter,
    PaymentProviderFilter,
    ContactProviderFilter,
  },
  apollo: {
    cities: {
      query: GET_CITIES,
      prefetch: true,
    },
    activities: {
      query: GET_ACTIVITIES,
      prefetch: true,
    },
    paymentProviders: {
      query: GET_PAYMENT_PROVIDERS,
      prefetch: true,
    },
    socialProviders: {
      query: GET_SOCIAL_PROVIDERS,
      prefetch: true,
    },
    contactProviders: {
      query: GET_CONTACT_PROVIDERS,
      prefetch: true,
    },
  },
  mounted() {
    console.log(this.cities, 'filters')
  },
}
</script>
