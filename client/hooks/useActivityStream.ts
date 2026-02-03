import { useQuery } from "@apollo/client/react";
import { ActivityStreamQueryResult } from "@/graphql/types";
import { GET_ACTIVITY_STREAM } from "@/graphql/ActivityStream";

export function useActivityStream(
  streamId: number,
  limit: number,
  offset: number,
) {
  return useQuery<ActivityStreamQueryResult>(GET_ACTIVITY_STREAM, {
    variables: {
      streamId,
      limit,
      offset,
    },
    fetchPolicy: "cache-first",
  });
}
