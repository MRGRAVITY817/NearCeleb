import { gql, useLazyQuery } from "@apollo/client";
import { CELEB_CARD_FRAGMENT } from "../../../lib/fragments/celeb.fragment";
import {
  SearchCelebs,
  SearchCelebsVariables,
} from "../../../__generated__/SearchCelebs";

const SEARCH_CELEBS_QUERY = gql`
  query SearchCelebs($input: SearchCelebsInput!) {
    searchCelebs(input: $input) {
      ok
      error
      pages
      celebInfo {
        ...CelebCardParts
      }
    }
  }
  ${CELEB_CARD_FRAGMENT}
`;

export const useSearchCelebs = (onCompleted: (data: SearchCelebs) => void) => {
  return useLazyQuery<SearchCelebs, SearchCelebsVariables>(
    SEARCH_CELEBS_QUERY,
    { onCompleted }
  );
};
