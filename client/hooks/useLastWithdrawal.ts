import { useQuery } from "@apollo/client/react";
import { LastWithdrawalQueryResult } from "@/graphql/types";
import { GET_LAST_WITHDRAWAL } from "@/graphql/LastWithdrawal";

export function useLastWithdrawal(streamId: string) {
  return useQuery<LastWithdrawalQueryResult>(GET_LAST_WITHDRAWAL, {
    variables: {
      streamId,
    },
    fetchPolicy: "cache-first",
  });
}
