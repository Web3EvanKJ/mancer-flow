import { ERC20_ABI } from "@/abis/erc20";
import { MANCER_FLOW_ADDRESS } from "@/config/contract";
import { useReadContract, useWriteContract } from "wagmi";

const PHII_TOKEN = "0xc6800342F5C0895dd4419b99Bf758b2136F1CAfe";

export function useApprovePHII(owner?: `0x${string}`) {
  const { writeContractAsync, isPending } = useWriteContract();

  const { data: allowance, refetch } = useReadContract({
    address: PHII_TOKEN,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: owner ? [owner, MANCER_FLOW_ADDRESS as `0x${string}`] : undefined,
  });

  const approve = async (spender: `0x${string}`, amount: bigint) => {
    return writeContractAsync({
      address: PHII_TOKEN,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [spender, amount],
    });
  };

  return {
    approve,
    allowance: allowance ?? 0n,
    refetchAllowance: refetch,
    isPending,
  };
}
