import { gql, useMutation } from "@apollo/client";
import {
  CreateCelebMutation,
  CreateCelebMutationVariables,
} from "../../../__generated__/CreateCelebMutation";

const CREATE_CELEB_MUTATION = gql`
  mutation CreateCelebMutation($input: CreateCelebInput!) {
    createCeleb(input: $input) {
      ok
      error
    }
  }
`;

export const useCreateCeleb = (
  onCompleted: (data: CreateCelebMutation) => void
) => {
  return useMutation<CreateCelebMutation, CreateCelebMutationVariables>(
    CREATE_CELEB_MUTATION,
    {
      onCompleted,
    }
  );
};
