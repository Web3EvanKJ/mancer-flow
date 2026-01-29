"use client";

import { useReadContract } from "wagmi";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";

export function useProtocolFee(token?: string) {
  const { data, isLoading, error } = useReadContract({
    address: MANCER_FLOW_ADDRESS,
    abi: MancerFlowAbi,
    functionName: "protocolFee",
    args: token ? [token] : undefined,
    query: {
      enabled: Boolean(token),
    },
  });

  return {
    protocolFee: data as bigint | undefined,
    isLoading,
    error,
  };
}
