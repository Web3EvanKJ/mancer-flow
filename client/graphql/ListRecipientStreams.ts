import { gql } from "@apollo/client";

export const GET_STREAMS_BY_RECIPIENT = gql`
  query StreamsByRecipient($recipient: String!) {
    streams(where: { recipient: $recipient }) {
      items {
        id
        sender
        token
        ratePerSecond
        balance
        status
      }
    }
  }
`;
