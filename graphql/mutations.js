import gql from 'graphql-tag'

export const CREATE_PROFILE = gql`
  mutation createProfile($input: CreateProfileInput!) {
    createProfile(input: $input) {
      id
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation createProfile($input: UpdateProfileInput!) {
    createProfile(input: $input) {
      id
    }
  }
`
