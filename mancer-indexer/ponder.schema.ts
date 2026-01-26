import { onchainTable } from "ponder";

export const stream = onchainTable("stream", (t) => ({
  id: t.text().primaryKey(),
  sender: t.hex().notNull(),
  recipient: t.hex().notNull(),
  token: t.hex().notNull(),
  tokenDecimals: t.integer().notNull(),
  ratePerSecond: t.bigint().notNull(),
  balance: t.bigint().notNull(),
  status: t.text().notNull(),
  transferable: t.boolean().notNull(),
  createdAt: t.bigint().notNull(),
  updatedAt: t.bigint().notNull(),
}));

export const streamEvent = onchainTable("stream_event", (t) => ({
  id: t.text().primaryKey(),
  streamId: t.text().notNull(),
  type: t.text().notNull(),
  amount: t.bigint(), // nullable
  oldRate: t.bigint(), // nullable
  newRate: t.bigint(), // nullable
  caller: t.hex().notNull(),
  txHash: t.hex().notNull(),
  timestamp: t.bigint().notNull(),
}));
