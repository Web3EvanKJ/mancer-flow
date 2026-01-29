import { useQuery } from "@apollo/client/react";
import { GET_STREAMS_BY_SENDER } from "@/graphql/ListSenderStreams";
import { StreamsBySenderQueryResult } from "@/graphql/types";

export function useListSenderStreams(sender: string) {
  return useQuery<StreamsBySenderQueryResult>(GET_STREAMS_BY_SENDER, {
    variables: {
      sender,
    },
    fetchPolicy: "cache-first",
  });
}
