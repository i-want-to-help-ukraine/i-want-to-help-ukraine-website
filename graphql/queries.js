import gql from 'graphql-tag'

export const GET_PROFILE = gql`
  query {
    profile {
      id
      firstName
      lastName
      description
      organization
      verificationStatus
      cities {
        id
        title
      }
      activities {
        id
        title
      }
      social {
        id
        url
      }
      payments {
        id
        metadata
      }
      contacts {
        id
        metadata
      }
    }
  }
`

export const GET_VOLUNTEER_BY_ID = gql`
  query volunteer($input: VolunteerByIdInput!) {
    volunteer(input: $input) {
      id
      firstName
      lastName
      description
      organization
      verificationStatus
      cities {
        id
        title
      }
      activities {
        id
        title
      }
      social {
        id
        url
      }
      payments {
        id
        metadata
      }
      contacts {
        id
        metadata
      }
    }
  }
`
export const GET_VOLUNTEERS = gql`
  query volunteersSearch($input: SearchInput!) {
    volunteersSearch(input: $input) {
      id
      firstName
      lastName
      cities {
        id
        title
      }
      activities {
        id
        title
      }
      social {
        id
        url
      }
      payments {
        id
        metadata
      }
      contacts {
        id
        metadata
      }
      verificationStatus
    }
  }
`

export const GET_CITIES = gql`
  query {
    cities {
      id
      title
    }
  }
`

export const GET_ACTIVITIES = gql`
  query {
    activities {
      id
      title
    }
  }
`

export const GET_SOCIAL_PROVIDERS = gql`
  query {
    socialProviders {
      id
      title
    }
  }
`

export const GET_PAYMENT_PROVIDERS = gql`
  query {
    paymentProviders {
      id
      title
    }
  }
`
