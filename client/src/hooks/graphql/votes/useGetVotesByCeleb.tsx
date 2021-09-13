import { gql } from "@apollo/client";

const GET_VOTES_BY_CELEB_QUERY = gql`
  query GetVotesByCeleb($input: GetVotesByCelebInput!) {
    getVotesByCeleb(input: $input) {
      ok
      error
    }
  }
`;
