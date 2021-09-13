import { gql, useQuery } from "@apollo/client";
import {
  GetCelebsPaginated,
  GetCelebsPaginatedVariables,
} from "../../../__generated__/GetCelebsPaginated";
import { GetAllCelebsPaginatedInput } from "../../../__generated__/globalTypes";

const GET_CELEBS_PAGINATED = gql`
  query GetCelebsPaginated($input: GetAllCelebsPaginatedInput!) {
    getAllCelebsPaginated(input: $input) {
      ok
      error
      celebInfo {
        profileImage
      }
      totalPages
      totalResults
    }
  }
`;

export const useCelebsPaginated = (pageQuery: GetAllCelebsPaginatedInput) => {
  return useQuery<GetCelebsPaginated, GetCelebsPaginatedVariables>(
    GET_CELEBS_PAGINATED,
    {
      variables: {
        input: {
          page: pageQuery.page,
          itemsPerPage: pageQuery.itemsPerPage,
        },
      },
    }
  );
};
