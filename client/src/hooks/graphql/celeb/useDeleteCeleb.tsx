import { gql, useMutation } from "@apollo/client";
import {
  DeleteCeleb,
  DeleteCelebVariables,
} from "../../../__generated__/DeleteCeleb";
const DELETE_CELEB_MUTATION = gql`
  mutation DeleteCeleb($input: DeleteCelebInput!) {
    deleteCeleb(input: $input) {
      ok
      error
    }
  }
`;

export const useDeleteCeleb = (onCompleted: (data: DeleteCeleb) => void) => {
  return useMutation<DeleteCeleb, DeleteCelebVariables>(DELETE_CELEB_MUTATION, {
    onCompleted,
  });
};
