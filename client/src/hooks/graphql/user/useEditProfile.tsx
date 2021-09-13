import { gql, useMutation } from "@apollo/client";
import {
  EditUserInfo,
  EditUserInfoVariables,
} from "../../../__generated__/EditUserInfo";

const EDIT_USER_INFO_MUTATION = gql`
  mutation EditUserInfo($input: EditUserInfoInput!) {
    editUserInfo(input: $input) {
      ok
      error
    }
  }
`;

export const useEditProfile = (onCompleted: (data: EditUserInfo) => void) =>
  useMutation<EditUserInfo, EditUserInfoVariables>(EDIT_USER_INFO_MUTATION, {
    onCompleted,
  });
