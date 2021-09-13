import { gql } from "@apollo/client";

export const CELEB_CARD_FRAGMENT = gql`
  fragment CelebCardParts on CelebInfo {
    id
    korName
    engName
    profileImage
    birthDate
    roles {
      actor
      artist
      sports
      author
      comedian
      influencer
      showhost
    }
    gender
  }
`;

// Celeb Detail Page
export const DETAILED_CELEB_FRAGMENT = gql`
  fragment DetailedCelebParts on CelebInfo {
    id
    korName
    engName
    profileImage
    birthDate
    roles {
      actor
      artist
      sports
      author
      comedian
      influencer
      showhost
    }
    realName
    debutDate
    description
    gender
    nationality
    company
    group
    fandom
    social {
      website
      facebook
      instagram
      tiktok
      twitch
      twitter
      youtube
    }
  }
`;
