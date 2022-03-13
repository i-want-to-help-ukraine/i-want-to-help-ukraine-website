import gql from 'graphql-tag'

export const CREATE_PROFILE = gql`
  mutation createProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
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
      payments {
        id
        metadata
        provider {
          id
        }
      }
      contacts {
        id
        metadata
      }
    }
  }
`
