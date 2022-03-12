import gql from 'graphql-tag';

export  const CREATE_VOLUNTEER = gql`
    mutation createVolunteer($input: CreateVolunteerInput!) {
        createVolunteer (input: $input) {
            id
        }
    }
`;