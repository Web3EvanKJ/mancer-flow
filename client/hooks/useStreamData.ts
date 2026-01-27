"use client";

import { useReadContract } from "wagmi";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";

type StreamData = {
  balance: bigint;
  isStream: boolean;
  isTransferable: boolean;
  isVoided: boolean;
  ratePerSecond: bigint;
  sender: `0x${string}`;
  snapshotDebtScaled: bigint;
  snapshotTime: number; // unix timestamp (seconds)
  token: `0x${string}`;
  tokenDecimals: number;
};

export function useStreamData(streamId?: bigint) {
  const { data, isLoading, error } = useReadContract({
    address: MANCER_FLOW_ADDRESS,
    abi: MancerFlowAbi,
    functionName: "getStream",
    args: streamId ? [streamId] : undefined,
    query: {
      enabled: Boolean(streamId),
    },
  });

  return {
    data: (data as StreamData) || undefined,
    isLoading,
    error,
  };
}
