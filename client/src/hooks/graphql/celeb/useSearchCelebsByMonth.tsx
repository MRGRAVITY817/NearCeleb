import { gql, useLazyQuery } from "@apollo/client";
import { CELEB_CARD_FRAGMENT } from "../../../lib/fragments/celeb.fragment";
import {
  CelebsByMonth,
  CelebsByMonthVariables,
} from "../../../__generated__/CelebsByMonth";

const SEARCH_CELEBS_BY_MONTH_QUERY = gql`
  query CelebsByMonth($input: SearchCelebsByMonthInput!) {
    searchCelebsByMonth(input: $input) {
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

export const useSearchCelebsByMonth = (
  onCompleted: (data: CelebsByMonth) => void
) => {
  return useLazyQuery<CelebsByMonth, CelebsByMonthVariables>(
    SEARCH_CELEBS_BY_MONTH_QUERY,
    {
      onCompleted,
    }
  );
};
