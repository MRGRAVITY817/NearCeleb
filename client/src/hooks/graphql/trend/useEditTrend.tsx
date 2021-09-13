import { gql, useMutation } from "@apollo/client";
import {
  EditTrend,
  EditTrendVariables,
} from "../../../__generated__/EditTrend";

const EDIT_TREND_MUTATION = gql`
  mutation EditTrend($input: EditTrendInput!) {
    editTrend(input: $input) {
      ok
      error
    }
  }
`;

export const useEditTrend = (onCompleted: (data: EditTrend) => void) => {
  return useMutation<EditTrend, EditTrendVariables>(EDIT_TREND_MUTATION, {
    onCompleted,
  });
};
