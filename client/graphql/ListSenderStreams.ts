import { gql } from "@apollo/client";

export const GET_STREAMS_BY_SENDER = gql`
  query StreamsBySender($sender: String!) {
    streams(where: { sender: $sender }) {
      items {
        id
        recipient
        token
        ratePerSecond
        balance
        status
      }
    }
  }
`;
