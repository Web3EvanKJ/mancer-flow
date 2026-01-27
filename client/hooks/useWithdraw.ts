"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";

export function useWithdraw() {
  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: confirming,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash });

  const withdraw = (streamId: bigint, to: `0x${string}`, amount: string) => {
    writeContract({
      address: MANCER_FLOW_ADDRESS,
      abi: MancerFlowAbi,
      functionName: "withdraw",
      args: [streamId, to, BigInt(parseUnits(amount, 18))],
    });
  };

  return {
    withdraw,
    isPending,
    confirming,
    isSuccess,
    error: writeError || receiptError,
  };
}
