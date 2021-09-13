import { gql, useMutation } from "@apollo/client";
import {
  DeleteLetter,
  DeleteLetterVariables,
} from "../../../__generated__/DeleteLetter";

const DELETE_LETTER_MUTATION = gql`
  mutation DeleteLetter($input: DeleteLetterInput!) {
    deleteLetter(input: $input) {
      ok
      error
    }
  }
`;

export const useDeleteLetter = (onCompleted: (data: DeleteLetter) => void) => {
  return useMutation<DeleteLetter, DeleteLetterVariables>(
    DELETE_LETTER_MUTATION,
    { onCompleted }
  );
};
