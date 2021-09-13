import { gql } from "@apollo/client";

export const LETTER_FRAGMENT = gql`
  fragment LetterParts on Letter {
    celebId
    previewImage
    contents {
      receiver
      heading
      body
      ending
      sender
      signature
    }
    style {
      paper
      pattern
      font
    }
  }
`;
