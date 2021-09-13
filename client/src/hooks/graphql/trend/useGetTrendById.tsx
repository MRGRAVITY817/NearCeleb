import { gql, useLazyQuery } from "@apollo/client";
import { TREND_FRAGMENT } from "../../../lib/fragments/trend.fragment";
import {
  GetTrendById,
  GetTrendByIdVariables,
} from "../../../__generated__/GetTrendById";

const GET_TREND_BY_ID_QUERY = gql`
  query GetTrendById($input: GetTrendByIdInput!) {
    getTrendById(input: $input) {
      ok
      error
      trend {
        ...TrendParts
      }
    }
  }
  ${TREND_FRAGMENT}
`;

export const useGetTrendById = (onCompleted: (data: GetTrendById) => void) => {
  return useLazyQuery<GetTrendById, GetTrendByIdVariables>(
    GET_TREND_BY_ID_QUERY,
    { onCompleted }
  );
};
