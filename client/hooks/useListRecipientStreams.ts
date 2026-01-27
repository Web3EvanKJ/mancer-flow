import { useQuery } from "@apollo/client/react";
import { GET_STREAMS_BY_RECIPIENT } from "@/graphql/ListRecipientStreams";
import { StreamsByRecipientQueryResult } from "@/graphql/types";

export function useListRecipientStreams(recipient: `0x${string}`) {
  return useQuery<StreamsByRecipientQueryResult>(GET_STREAMS_BY_RECIPIENT, {
    variables: {
      recipient,
    },
    fetchPolicy: "cache-first",
  });
}
