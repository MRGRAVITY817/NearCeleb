import { gql } from "@apollo/client";

export const TREND_FRAGMENT = gql`
  fragment TrendParts on Trend {
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
