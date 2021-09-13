import { gql, useLazyQuery } from "@apollo/client";
import { CELEB_CARD_FRAGMENT } from "../../../lib/fragments/celeb.fragment";
import {
  CelebsByName,
  CelebsByNameVariables,
} from "../../../__generated__/CelebsByName";

const CELEBS_BY_NAME_QUERY = gql`
  query CelebsByName($input: SearchCelebByNameInput!) {
    searchCelebByName(input: $input) {
      ok
      error
      celebInfo {
        ...CelebCardParts
      }
    }
  }
  ${CELEB_CARD_FRAGMENT}
`;

export const useGetCelebsByName = (
  onCompleted: (data: CelebsByName) => void
) => {
  return useLazyQuery<CelebsByName, CelebsByNameVariables>(
    CELEBS_BY_NAME_QUERY,
    { onCompleted }
  );
};
