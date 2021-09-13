import { gql, useQuery } from "@apollo/client";
import { TREND_FRAGMENT } from "../../../lib/fragments/trend.fragment";
import { GetAllTrends } from "../../../__generated__/GetAllTrends";

const GET_ALL_TRENDS_QUERY = gql`
  query GetAllTrends {
    getAllTrends {
      ok
      error
      trends {
        ...TrendParts
      }
    }
  }
  ${TREND_FRAGMENT}
`;

export const useGetAllTrends = () => {
  return useQuery<GetAllTrends>(GET_ALL_TRENDS_QUERY);
};
