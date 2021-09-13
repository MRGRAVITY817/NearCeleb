import { gql, useMutation } from "@apollo/client";
import {
  EditCelebMutation,
  EditCelebMutationVariables,
} from "../../../__generated__/EditCelebMutation";

const EDIT_CELEB_MUTATION = gql`
  mutation EditCelebMutation($input: EditCelebInput!) {
    editCeleb(input: $input) {
      ok
      error
    }
  }
`;

export const useEditCeleb = (
  onCompleted: (data: EditCelebMutation) => void
) => {
  return useMutation<EditCelebMutation, EditCelebMutationVariables>(
    EDIT_CELEB_MUTATION,
    {
      onCompleted,
    }
  );
};
