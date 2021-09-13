import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { GetVotesByUser } from "../../../__generated__/GetVotesByUser";

const GET_VOTES_BY_USER_QUERY = gql`
  query GetVotesByUser {
    getVotesByUser {
      ok
      error
      votes {
        voteType
        addVote {
          id
        }
        editVote {
          id
        }
        deleteVote {
          id
        }
        agreed
        celeb {
          id
        }
      }
    }
  }
`;

export const useGetVotesByUser = (
  onCompleted?: (data: GetVotesByUser) => void
) => {
  if (typeof onCompleted !== undefined) {
    return useLazyQuery(GET_VOTES_BY_USER_QUERY, { onCompleted });
  }
  return useQuery(GET_VOTES_BY_USER_QUERY);
};
