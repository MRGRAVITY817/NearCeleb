import { gql } from "@apollo/client";

export const EDIT_VOTE_FRAGMENT = gql`
  fragment EditContent on EditVote {
    mainImage
    coverImage
    korTitle
    engTitle
    category
    description
    trailer
    casts {
      id
    }
  }
`;
