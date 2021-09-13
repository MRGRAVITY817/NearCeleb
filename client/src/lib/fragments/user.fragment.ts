import { gql } from "@apollo/client";

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserParts on UserInfo {
    id
    email
    userName
    profileImage
    profileState
    description
    coverImage
    signature
    birthDate
  }
`;
