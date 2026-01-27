"use client";

import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { Address, parseUnits } from "viem";
import toast from "react-hot-toast";
import { monthlyToRatePerSecondUD21x18 } from "@/lib/rate";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";
import { useApprovePHII } from "./useApprovePHII";

export function useCreateAndDepositStream() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync, isPending } = useWriteContract();

  const { approve, allowance } = useApprovePHII(address);

  async function createAndDeposit({
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
    if (!address) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      const deposit = parseUnits(depositAmount, 18);

      // Approve if needed
      if (allowance < deposit) {
        const approveHash = await approve(MANCER_FLOW_ADDRESS, deposit);

        toast.loading("Approving PHII...", { id: approveHash });

        await publicClient?.waitForTransactionReceipt({
          hash: approveHash,
        });

        toast.success("PHII approved", { id: approveHash });
      }

      // Create stream
      const ratePerSecond = monthlyToRatePerSecondUD21x18(monthlyRate);

      const hash = await writeContractAsync({
        address: MANCER_FLOW_ADDRESS,
        abi: MancerFlowAbi,
        functionName: "createAndDeposit",
        args: [address, recipient, ratePerSecond, token, transferable, deposit],
      });

      toast.loading("Creating stream...", { id: hash });

      await publicClient?.waitForTransactionReceipt({ hash });

      toast.success("Stream created successfully!", { id: hash });

      return hash;
    } catch (err: any) {
      console.error(err);
      toast.error(err?.shortMessage || err?.message || "Transaction failed");
      throw err;
    }
  }

  return {
    createAndDeposit,
    isPending,
  };
}
