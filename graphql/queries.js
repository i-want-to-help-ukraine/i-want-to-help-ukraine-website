import gql from 'graphql-tag'

export const GET_ACTIVITIES = gql`
  query {
    activities {
      id
      title
    }
  }
`

// export const GET_PROFILE = gql`
//   query profile(($input: ProfileInput!) {
//     profile (input: $input) {}
//   }
// `

export const GET_VOLUNTEER_BY_ID = gql`
  query volunteer($input: VolunteerByIdInput!) {
    volunteer(input: $input) {
      id
      firstname
      lastname
      verificationStatus
      social {
        id
        url
      }
      activities {
        id
        title
      }
    }
  }
`
export const GET_VOLUNTEERS = gql`
  query volunteersSearch($input: SearchInput!) {
    volunteersSearch(input: $input) {
      id
      firstname
      lastname
      verificationStatus
      social {
        id
        url
      }
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
