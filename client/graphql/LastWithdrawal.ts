import { gql } from "@apollo/client";

export const GET_LAST_WITHDRAWAL = gql`
  query LastWithdrawal($streamId: BigInt!) {
    streamEvents(
      where: { AND: [{ streamId: $streamId }, { type: "WITHDRAW" }] }
      orderBy: "timestamp"
      orderDirection: "desc"
      limit: 1
    ) {
      items {
        id
        timestamp
        amount
      }
    }
  }
`;
