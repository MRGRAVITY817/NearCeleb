import { gql, useMutation } from "@apollo/client";
import {
  ToggleFollow,
  ToggleFollowVariables,
} from "../../../__generated__/ToggleFollow";

const TOGGLE_FOLLOW_MUTATION = gql`
  mutation ToggleFollow($input: ToggleFollowInput!) {
    toggleFollow(input: $input) {
      ok
      error
      isFollowing
    }
  }
`;

export const useToggleFollow = (onCompleted?: (data: ToggleFollow) => void) => {
  return useMutation<ToggleFollow, ToggleFollowVariables>(
    TOGGLE_FOLLOW_MUTATION,
    {
      onCompleted,
    }
  );
};
