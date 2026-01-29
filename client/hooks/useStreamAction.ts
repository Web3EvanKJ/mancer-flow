"use client";

import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { Address, parseUnits } from "viem";
import toast from "react-hot-toast";
import { monthlyToRatePerSecondUD21x18 } from "@/lib/rate";
import MancerFlowAbi from "@/abis/MancerFlow.json";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";
import { useApprovePHII } from "./useApprovePHII";

export function useStreamActions() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync, isPending } = useWriteContract();
  const {
    approve,
    allowance,
    isPending: approvePending,
  } = useApprovePHII(address);

  // ---------------- DEPOSIT ----------------
  async function depositStream({
    streamId,
    amount,
    recipient,
  }: {
    streamId: bigint;
    amount: string;
    recipient: Address;
  }) {
    if (!address) return toast.error("Wallet not connected");

    try {
      const parsedAmount = parseUnits(amount, 18);

      // Approve PHII if needed
      if (allowance < parsedAmount) {
        const approveHash = await approve(MANCER_FLOW_ADDRESS, parsedAmount);

        toast.loading("Approving PHII...", { id: approveHash });
        await publicClient?.waitForTransactionReceipt({ hash: approveHash });
        toast.success("PHII approved", { id: approveHash });
      }

      const hash = await writeContractAsync({
        address: MANCER_FLOW_ADDRESS,
        abi: MancerFlowAbi,
        functionName: "deposit",
        args: [streamId, parsedAmount, address, recipient],
      });

      toast.loading("Depositing to stream...", { id: hash });
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Deposit successful!", { id: hash });

      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || "Deposit failed");
      throw err;
    }
  }

  // ---------------- RESTART ----------------
  async function restartStream({
    streamId,
    monthlyRate,
  }: {
    streamId: bigint;
    monthlyRate: string;
  }) {
    if (!address) return toast.error("Wallet not connected");

    try {
      const ratePerSecond = monthlyToRatePerSecondUD21x18(monthlyRate);

      const hash = await writeContractAsync({
        address: MANCER_FLOW_ADDRESS,
        abi: MancerFlowAbi,
        functionName: "restart",
        args: [streamId, ratePerSecond],
      });

      toast.loading("Restarting stream...", { id: hash });
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Stream restarted!", { id: hash });

      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || "Restart failed");
      throw err;
    }
  }

  // ---------------- ADJUST RATE ----------------
  async function adjustRate({
    streamId,
    monthlyRate,
  }: {
    streamId: bigint;
    monthlyRate: string;
  }) {
    if (!address) return toast.error("Wallet not connected");

    try {
      const ratePerSecond = monthlyToRatePerSecondUD21x18(monthlyRate);

      const hash = await writeContractAsync({
        address: MANCER_FLOW_ADDRESS,
        abi: MancerFlowAbi,
        functionName: "adjustRatePerSecond",
        args: [streamId, ratePerSecond],
      });

      toast.loading("Updating rate...", { id: hash });
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Rate updated!", { id: hash });

      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || "Adjust rate failed");
      throw err;
    }
  }

  // ---------------- REFUND ----------------
  async function refundStream({
    streamId,
    amount,
  }: {
    streamId: bigint;
    amount: string;
  }) {
    if (!address) return toast.error("Wallet not connected");

    try {
      const parsedAmount = parseUnits(amount, 18);

      const hash = await writeContractAsync({
        address: MANCER_FLOW_ADDRESS,
        abi: MancerFlowAbi,
        functionName: "refund",
        args: [streamId, parsedAmount],
      });

      toast.loading("Processing refund...", { id: hash });
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Refund successful!", { id: hash });

      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || "Refund failed");
      throw err;
    }
  }

  // ---------------- PAUSE ----------------
  async function pauseStream(streamId: bigint) {
    if (!address) return toast.error("Wallet not connected");

    try {
      const hash = await writeContractAsync({
        address: MANCER_FLOW_ADDRESS,
        abi: MancerFlowAbi,
        functionName: "pause",
        args: [streamId],
      });

      toast.loading("Pausing stream...", { id: hash });
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Stream paused", { id: hash });

      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || "Pause failed");
      throw err;
    }
  }

  // ---------------- REFUND MAX ----------------
  async function refundMaxStream(streamId: bigint) {
    if (!address) return toast.error("Wallet not connected");

    try {
      const hash = await writeContractAsync({
        address: MANCER_FLOW_ADDRESS,
        abi: MancerFlowAbi,
        functionName: "refundMax",
        args: [streamId],
      });

      toast.loading("Refunding max...", { id: hash });
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Max refund completed", { id: hash });

      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || "Refund max failed");
      throw err;
    }
  }

  // ---------------- VOID STREAM ----------------
  async function voidStream(streamId: bigint) {
    if (!address) return toast.error("Wallet not connected");

    try {
      const hash = await writeContractAsync({
        address: MANCER_FLOW_ADDRESS,
        abi: MancerFlowAbi,
        functionName: "void",
        args: [streamId],
      });

      toast.loading("Voiding stream...", { id: hash });
      await publicClient?.waitForTransactionReceipt({ hash });
      toast.success("Stream voided", { id: hash });

      return hash;
    } catch (err: any) {
      toast.error(err?.shortMessage || "Void failed");
      throw err;
    }
  }

  return {
    depositStream,
    restartStream,
    adjustRate,
    refundStream,
    pauseStream,
    refundMaxStream,
    voidStream,
    isPending,
    approvePending,
  };
}
