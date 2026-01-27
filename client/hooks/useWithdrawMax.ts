"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";

export function useWithdrawMax() {
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

  const withdrawMax = (streamId: bigint, to: `0x${string}`) => {
    writeContract({
      address: MANCER_FLOW_ADDRESS,
      abi: MancerFlowAbi,
      functionName: "withdrawMax",
      args: [streamId, to],
    });
  };

  return {
    withdrawMax,
    isPending,
    confirming,
    isSuccess,
    error: writeError || receiptError,
  };
}
