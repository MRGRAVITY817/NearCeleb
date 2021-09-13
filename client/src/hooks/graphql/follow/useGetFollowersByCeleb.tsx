import { gql, useLazyQuery } from "@apollo/client";
import {
  Followers,
  FollowersVariables,
} from "../../../__generated__/Followers";

const GET_FOLLOWERS_BY_CELEB_QUERY = gql`
  query Followers($input: GetFollowersByCelebInput!) {
    getFollowersByCeleb(input: $input) {
      ok
      error
      followers {
        userInfo {
          id
          userName
        }
      }
      followersCount
    }
  }
`;

export const useGetFollowersByUser = (
  onCompleted: (data: Followers) => void
) => {
  return useLazyQuery<Followers, FollowersVariables>(
    GET_FOLLOWERS_BY_CELEB_QUERY,
    { onCompleted }
  );
};
