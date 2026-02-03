import { gql } from "@apollo/client";

export const GET_ACTIVITY_STREAM = gql`
  query GetStreamEventsByStreamId(
    $streamId: BigInt!
    $limit: Int!
    $offset: Int!
  ) {
    streamEvents(
      where: { streamId: $streamId }
      limit: $limit
      offset: $offset
      orderBy: "timestamp"
      orderDirection: "desc"
    ) {
      items {
        id
        streamId
        type
        amount
        oldRate
        newRate
        caller
        txHash
        timestamp
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;
