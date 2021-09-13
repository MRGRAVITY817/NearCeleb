import { gql, useMutation } from "@apollo/client";
import {
  CreateAccount,
  CreateAccountVariables,
} from "../../../__generated__/CreateAccount";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;

export const useCreateAccount = (
  onCompleted: (data: CreateAccount) => void
) => {
  return useMutation<CreateAccount, CreateAccountVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
};
