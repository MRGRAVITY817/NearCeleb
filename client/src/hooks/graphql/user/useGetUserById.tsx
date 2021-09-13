import { gql, useQuery } from "@apollo/client";
import { USER_PROFILE_FRAGMENT } from "../../../lib/fragments/user.fragment";
import {
  GetUserInfo,
  GetUserInfoVariables,
} from "../../../__generated__/GetUserInfo";

const GET_USER_QUERY = gql`
  query GetUserInfo($input: GetUserInfoInput!) {
    getUserInfo(input: $input) {
      ok
      error
      userInfo {
        ...UserParts
      }
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const useGetUser = (id?: number, email?: string) =>
  useQuery<GetUserInfo, GetUserInfoVariables>(GET_USER_QUERY, {
    variables: {
      input: {
        id,
        email,
      },
    },
  });
