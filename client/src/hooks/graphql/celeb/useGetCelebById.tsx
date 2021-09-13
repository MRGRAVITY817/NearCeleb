import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { DETAILED_CELEB_FRAGMENT } from "../../../lib/fragments/celeb.fragment";
import {
  GetCelebById,
  GetCelebByIdVariables,
} from "../../../__generated__/GetCelebById";

const GET_CELEB_BY_ID_QUERY = gql`
  query GetCelebById($input: GetCelebByIdInput!) {
    getCelebById(input: $input) {
      ok
      error
      celebInfo {
        ...DetailedCelebParts
      }
    }
  }
  ${DETAILED_CELEB_FRAGMENT}
`;

export const useGetCelebById = (onCompleted?: (data: GetCelebById) => void) => {
  return useLazyQuery<GetCelebById, GetCelebByIdVariables>(
    GET_CELEB_BY_ID_QUERY,
    { onCompleted }
  );
};

export const useGetCelebInfo = (id: number) => {
  return useQuery<GetCelebById, GetCelebByIdVariables>(GET_CELEB_BY_ID_QUERY, {
    variables: {
      input: {
        celebId: id,
      },
    },
  });
};
