import { gql, useMutation } from "@apollo/client";
import { Login, LoginVariables } from "../../../__generated__/Login";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LocalLoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

export const useLoginMutation = (onCompleted: (data: Login) => void) => {
  return useMutation<Login, LoginVariables>(LOGIN_MUTATION, {
    onCompleted,
  });
};
