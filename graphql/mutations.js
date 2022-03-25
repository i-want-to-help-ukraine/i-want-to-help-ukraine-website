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

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
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
