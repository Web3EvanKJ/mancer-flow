// A single stream item returned from the GraphQL API
export type StreamSenderItem = {
  id: string;
  recipient: string;
  token: string;
  ratePerSecond: string | number;
  balance: string | number;
  status: string;
};

export type StreamsBySenderQueryResult = {
  streams: {
    items: StreamSenderItem[];
  };
};

// A single stream item returned from the GraphQL API
export type StreamRecipientItem = {
  id: string;
  sender: string;
  token: string;
  ratePerSecond: string;
  balance: string;
  status: string;
};

export type StreamsByRecipientQueryResult = {
  streams: {
    items: StreamRecipientItem[];
  };
};

export type LastWithdrawalQueryResult = {
  streamEvents: {
    items: {
      id: string;
      timestamp: string;
      amount: string;
    }[];
  };
};
