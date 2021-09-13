import { gql, useQuery } from "@apollo/client";
import {
  IsFollowing,
  IsFollowingVariables,
} from "../../../__generated__/IsFollowing";

const IS_FOLLOWING_QUERY = gql`
  query IsFollowing($input: IsFollowingInput!) {
    isFollowing(input: $input) {
      ok
      error
      isFollowing
    }
  }
`;

export const useIsFollowing = (celebId: number) => {
  return useQuery<IsFollowing, IsFollowingVariables>(IS_FOLLOWING_QUERY, {
    variables: { input: { celebId } },
  });
};
