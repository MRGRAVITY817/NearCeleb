import { gql, useQuery } from "@apollo/client";
import { LETTER_FRAGMENT } from "../../../lib/fragments/letter.fragment";
import { GetLettersByUser } from "../../../__generated__/GetLettersByUser";

const GET_LETTERS_BY_USER_QUERY = gql`
  query GetLettersByUser {
    getLettersByUser {
      ok
      error
      letters {
        ...LetterParts
      }
    }
  }
  ${LETTER_FRAGMENT}
`;

export const useGetLettersByUser = () => {
  return useQuery<GetLettersByUser>(GET_LETTERS_BY_USER_QUERY);
};
