import { ponder } from "ponder:registry";
import { stream, streamEvent } from "../ponder.schema";

// Utility
function now(block: { timestamp: bigint }) {
  return block.timestamp;
}

/* ---------------------------------------------
   CREATE
----------------------------------------------*/
ponder.on("MancerFlow:CreateFlowStream", async ({ event, context }) => {
  const { streamId, sender, recipient, ratePerSecond, token, transferable } =
    event.args;

  await context.db.insert(stream).values({
    id: streamId.toString(),
    sender,
    recipient,
    token,
    tokenDecimals: 18,
    ratePerSecond: ratePerSecond,
    balance: 0n,
    status: "STREAMING",
    transferable,
    createdAt: now(event.block),
    updatedAt: now(event.block),
  });

  await context.db.insert(streamEvent).values({
    id: `${event.transaction.hash}-create`,
    streamId: streamId.toString(),
    type: "CREATE",
    caller: event.transaction.from,
    txHash: event.transaction.hash,
    timestamp: now(event.block),
  });
});

/* ---------------------------------------------
   DEPOSIT
----------------------------------------------*/
ponder.on("MancerFlow:DepositFlowStream", async ({ event, context }) => {
  const { streamId, amount } = event.args;

  await context.db.update(stream, { id: streamId.toString() }).set((row) => ({
    balance: row.balance + amount,
    updatedAt: now(event.block),
  }));

  await context.db.insert(streamEvent).values({
    id: `${event.transaction.hash}-deposit`,
    streamId: streamId.toString(),
    type: "DEPOSIT",
    amount,
    caller: event.transaction.from,
    txHash: event.transaction.hash,
    timestamp: now(event.block),
  });
});

/* ---------------------------------------------
   RATE CHANGE
----------------------------------------------*/
ponder.on("MancerFlow:AdjustFlowStream", async ({ event, context }) => {
  const { streamId, oldRatePerSecond, newRatePerSecond } = event.args;

  await context.db.update(stream, { id: streamId.toString() }).set({
    ratePerSecond: newRatePerSecond,
    updatedAt: now(event.block),
  });

  await context.db.insert(streamEvent).values({
    id: `${event.transaction.hash}-adjust`,
    streamId: streamId.toString(),
    type: "ADJUST_RATE",
    oldRate: oldRatePerSecond,
    newRate: newRatePerSecond,
    caller: event.transaction.from,
    txHash: event.transaction.hash,
    timestamp: now(event.block),
  });
});

/* ---------------------------------------------
   PAUSE / RESTART
----------------------------------------------*/
ponder.on("MancerFlow:PauseFlowStream", async ({ event, context }) => {
  const { streamId } = event.args;

  await context.db
    .update(stream, { id: streamId.toString() })
    .set({ status: "PAUSED", updatedAt: now(event.block) });

  await context.db.insert(streamEvent).values({
    id: `${event.transaction.hash}-pause`,
    streamId: streamId.toString(),
    type: "PAUSE",
    caller: event.transaction.from,
    txHash: event.transaction.hash,
    timestamp: now(event.block),
  });
});

ponder.on("MancerFlow:RestartFlowStream", async ({ event, context }) => {
  const { streamId, ratePerSecond } = event.args;

  await context.db.update(stream, { id: streamId.toString() }).set({
    ratePerSecond: ratePerSecond,
    status: "STREAMING",
    updatedAt: now(event.block),
  });

  await context.db.insert(streamEvent).values({
    id: `${event.transaction.hash}-restart`,
    streamId: streamId.toString(),
    type: "RESTART",
    newRate: ratePerSecond,
    caller: event.transaction.from,
    txHash: event.transaction.hash,
    timestamp: now(event.block),
  });
});

/* ---------------------------------------------
   WITHDRAW / REFUND
----------------------------------------------*/
ponder.on("MancerFlow:WithdrawFromFlowStream", async ({ event, context }) => {
  const { streamId, withdrawAmount } = event.args;

  await context.db.update(stream, { id: streamId.toString() }).set((row) => ({
    balance: row.balance - withdrawAmount,
    updatedAt: now(event.block),
  }));

  await context.db.insert(streamEvent).values({
    id: `${event.transaction.hash}-withdraw`,
    streamId: streamId.toString(),
    type: "WITHDRAW",
    amount: withdrawAmount,
    caller: event.transaction.from,
    txHash: event.transaction.hash,
    timestamp: now(event.block),
  });
});

ponder.on("MancerFlow:RefundFromFlowStream", async ({ event, context }) => {
  const { streamId, amount } = event.args;

  await context.db.update(stream, { id: streamId.toString() }).set((row) => ({
    balance: row.balance - amount,
    updatedAt: now(event.block),
  }));

  await context.db.insert(streamEvent).values({
    id: `${event.transaction.hash}-refund`,
    streamId: streamId.toString(),
    type: "REFUND",
    amount,
    caller: event.transaction.from,
    txHash: event.transaction.hash,
    timestamp: now(event.block),
  });
});

/* ---------------------------------------------
   VOID
----------------------------------------------*/
ponder.on("MancerFlow:VoidFlowStream", async ({ event, context }) => {
  const { streamId } = event.args;

  await context.db
    .update(stream, { id: streamId.toString() })
    .set({ status: "VOIDED", updatedAt: now(event.block) });

  await context.db.insert(streamEvent).values({
    id: `${event.transaction.hash}-void`,
    streamId: streamId.toString(),
    type: "VOID",
    caller: event.transaction.from,
    txHash: event.transaction.hash,
    timestamp: now(event.block),
  });
});
