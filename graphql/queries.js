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
      avatarUrl
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
        provider {
          id
          title
        }
      }
      payments {
        id
        metadata
        provider {
          id
          title
        }
      }
      contacts {
        id
        metadata
        provider {
          id
          title
        }
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
      organization
      description
      avatarUrl
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
        provider {
          id
          title
        }
      }
      payments {
        id
        metadata
        provider {
          id
          title
        }
      }
      contacts {
        id
        metadata
        provider {
          id
          title
        }
      }
    }
  }
`
export const GET_VOLUNTEERS = gql`
  query volunteersSearch($input: SearchInput!) {
    volunteersSearch(input: $input) {
      totalCount
      startCursor
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          firstName
          lastName
          avatarUrl
          description
          activities {
            id
            title
          }
          cities {
            id
            title
          }
          payments {
            id
            metadata
            provider {
              id
              title
            }
          }
          social {
            id
            url
            provider {
              id
              title
            }
          }
        }
      }
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

export const GET_CONTACT_PROVIDERS = gql`
  query {
    contactProviders {
      id
      title
    }
  }
`
