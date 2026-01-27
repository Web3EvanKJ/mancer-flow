"use client";

import { useReadContract } from "wagmi";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";

export function useStreamStatus(streamId?: bigint) {
  const { data, isLoading, error } = useReadContract({
    address: MANCER_FLOW_ADDRESS,
    abi: MancerFlowAbi,
    functionName: "statusOf",
    args: streamId ? [streamId] : undefined,
    query: {
      enabled: Boolean(streamId),
    },
  });

  return {
    status: data as number | undefined,
    isLoading,
    error,
  };
}
