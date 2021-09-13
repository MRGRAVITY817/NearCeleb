import { gql, useMutation } from "@apollo/client";
import {
  SaveLetterMutation,
  SaveLetterMutationVariables,
} from "../../../__generated__/SaveLetterMutation";

const SAVE_LETTER_MUTATION = gql`
  mutation SaveLetterMutation($input: WriteLetterInput!) {
    writeLetter(input: $input) {
      ok
      error
    }
  }
`;

export const useSaveLetter = (
  onCompleted: (data: SaveLetterMutation) => void
) => {
  return useMutation<SaveLetterMutation, SaveLetterMutationVariables>(
    SAVE_LETTER_MUTATION,
    {
      onCompleted,
    }
  );
};
