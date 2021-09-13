import { gql, useMutation } from "@apollo/client";
import {
  DeleteTrend,
  DeleteTrendVariables,
} from "../../../__generated__/DeleteTrend";

const DELETE_TREND_MUTATION = gql`
  mutation DeleteTrend($input: DeleteTrendInput!) {
    deleteTrend(input: $input) {
      ok
      error
    }
  }
`;

export const uesDeleteTrend = (onCompleted: (data: DeleteTrend) => void) => {
  return useMutation<DeleteTrend, DeleteTrendVariables>(DELETE_TREND_MUTATION, {
    onCompleted,
  });
};
