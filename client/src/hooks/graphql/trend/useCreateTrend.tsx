import { gql, useMutation } from "@apollo/client";
import {
  CreateTrend,
  CreateTrendVariables,
} from "../../../__generated__/CreateTrend";

const CREATE_TREND_MUTATION = gql`
  mutation CreateTrend($input: CreateTrendInput!) {
    createTrend(input: $input) {
      ok
      error
    }
  }
`;

export const useCreateTrend = (onCompleted: (data: CreateTrend) => void) => {
  return useMutation<CreateTrend, CreateTrendVariables>(CREATE_TREND_MUTATION, {
    onCompleted,
  });
};
