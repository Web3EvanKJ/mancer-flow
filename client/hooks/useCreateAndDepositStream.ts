// src/hooks/useCreateAndDepositStream.ts
"use client";

import { useWriteContract, useConnection } from "wagmi";
import { Address, parseUnits } from "viem";
import { monthlyToRatePerSecondUD21x18 } from "@/lib/rate";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";

export function useCreateAndDepositStream() {
  const { address } = useConnection();
  const { writeContractAsync, isPending, isSuccess, error } =
    useWriteContract();

  function createAndDeposit({
    recipient,
    token,
    monthlyRate,
    depositAmount,
    transferable,
  }: {
    recipient: Address;
    token: Address;
    monthlyRate: string;
    depositAmount: string;
    transferable: boolean;
  }) {
    if (!address) throw new Error("Wallet not connected");

    const ratePerSecond = monthlyToRatePerSecondUD21x18(monthlyRate);

    writeContractAsync({
      address: MANCER_FLOW_ADDRESS,
      abi: MancerFlowAbi,
      functionName: "createAndDeposit",
      args: [
        address, // sender
        recipient,
        ratePerSecond,
        token,
        transferable,
        parseUnits(depositAmount, 18), // uint128
      ],
    });
  }

  return {
    createAndDeposit,
    isPending,
    isSuccess,
    error,
  };
}
