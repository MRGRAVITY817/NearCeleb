import { gql, useLazyQuery } from "@apollo/client";
import { CELEB_CARD_FRAGMENT } from "../../../lib/fragments/celeb.fragment";
import {
  CelebsByRole,
  CelebsByRoleVariables,
} from "../../../__generated__/CelebsByRole";

const CELEBS_BY_ROLE_QUERY = gql`
  query CelebsByRole($input: GetCelebsByRoleInput!) {
    getCelebsByRole(input: $input) {
      ok
      error
      celebInfo {
        ...CelebCardParts
      }
    }
  }
  ${CELEB_CARD_FRAGMENT}
`;

export const useGetCelebsByRole = (
  onCompleted: (data: CelebsByRole) => void
) => {
  return useLazyQuery<CelebsByRole, CelebsByRoleVariables>(
    CELEBS_BY_ROLE_QUERY,
    {
      onCompleted,
    }
  );
};
