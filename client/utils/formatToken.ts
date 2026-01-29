import { formatUnits } from "viem";

export function formatToken(value: bigint) {
  return Number(formatUnits(value, 18)).toFixed(6);
}
