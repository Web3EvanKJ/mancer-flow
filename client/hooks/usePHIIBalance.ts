import { ERC20_ABI } from "@/abis/erc20";
import { useReadContract } from "wagmi";
import { formatUnits } from "viem";

const PHII_TOKEN = "0xc6800342F5C0895dd4419b99Bf758b2136F1CAfe";

export function usePHIIBalance(owner?: `0x${string}`) {
  const { data, isLoading, refetch } = useReadContract({
    address: PHII_TOKEN,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: owner ? [owner] : undefined,
  });

  const balance = data ?? 0n;

  const formatted = formatUnits(balance, 18); // PHII assumed 18 decimals

  return {
    balance, // bigint (raw)
    formatted, // string human-readable
    isLoading,
    refetchBalance: refetch,
  };
}
