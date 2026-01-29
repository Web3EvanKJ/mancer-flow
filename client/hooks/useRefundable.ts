"use client";

import { useReadContract } from "wagmi";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";

export function useRefundable(streamId?: bigint) {
  const { data, isLoading, error } = useReadContract({
    address: MANCER_FLOW_ADDRESS,
    abi: MancerFlowAbi,
    functionName: "refundableAmountOf",
    args: streamId ? [streamId] : undefined,
    query: {
      enabled: Boolean(streamId),
    },
  });

  return {
    refundable: data as bigint | undefined,
    isLoading,
    error,
  };
}
