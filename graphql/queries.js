import gql from 'graphql-tag'

export const GET_ACTIVITIES = gql`
  query {
    activities {
      id
      title
    }
  }
`;

