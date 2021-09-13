import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../../../lib/apollo";
import { USER_PROFILE_FRAGMENT } from "../../../lib/fragments/user.fragment";
import { MeQuery } from "../../../__generated__/MeQuery";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      ok
      error
      userInfo {
        ...UserParts
      }
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const useQueryResult = useQuery<MeQuery>(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (useQueryResult.data?.me === null) {
      // Token not working so log out
      logUserOut();
    }
  }, [useQueryResult.data]);
  return useQueryResult;
};
