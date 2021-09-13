import { gql, useQuery } from "@apollo/client";
import {
  Following,
  FollowingVariables,
} from "../../../__generated__/Following";

const GET_FOLLOWING_BY_USER_QUERY = gql`
  query Following($input: GetFollowingByUserInput!) {
    getFollowingByUser(input: $input) {
      ok
      error
      following {
        celebInfo {
          id
          engName
          profileImage
        }
      }
      followingCount
    }
  }
`;

export const useGetFollowingByUser = (userId: number) => {
  return useQuery<Following, FollowingVariables>(GET_FOLLOWING_BY_USER_QUERY, {
    variables: {
      input: { userId },
    },
  });
};
