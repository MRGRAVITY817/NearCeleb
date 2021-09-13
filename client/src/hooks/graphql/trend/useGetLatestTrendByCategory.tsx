import { gql, useQuery } from "@apollo/client";
import { TREND_FRAGMENT } from "../../../lib/fragments/trend.fragment";
import {
  GetLatestTrendByCategory,
  GetLatestTrendByCategoryVariables,
} from "../../../__generated__/GetLatestTrendByCategory";
import { TrendCategory } from "../../../__generated__/globalTypes";

const GET_LATEST_TREND_BY_CATEGORY_QUERY = gql`
  query GetLatestTrendByCategory($input: GetLatestTrendByCategoryInput!) {
    getLatestTrendByCategory(input: $input) {
      ok
      error
      trend {
        ...TrendParts
      }
    }
  }
  ${TREND_FRAGMENT}
`;

export const useGetLatestTrendByCategory = (category: TrendCategory) => {
  return useQuery<GetLatestTrendByCategory, GetLatestTrendByCategoryVariables>(
    GET_LATEST_TREND_BY_CATEGORY_QUERY,
    { variables: { input: { category } } }
  );
};
