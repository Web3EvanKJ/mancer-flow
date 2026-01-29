"use client";

import { useReadContract } from "wagmi";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";

export function useDepletionTime(streamId?: bigint) {
  const { data, isLoading, error } = useReadContract({
    address: MANCER_FLOW_ADDRESS,
    abi: MancerFlowAbi,
    functionName: "depletionTimeOf",
    args: streamId ? [streamId] : undefined,
    query: {
      enabled: Boolean(streamId),
    },
  });

  return {
    depletionTime: data as bigint | undefined,
    isLoading,
    error,
  };
}
