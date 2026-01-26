import { parseUnits } from "viem";

const SECONDS_PER_MONTH = 30 * 24 * 60 * 60;

export function monthlyToRatePerSecondUD21x18(monthly: string) {
  // monthly is human (e.g. "1000")
  const monthly18 = parseUnits(monthly, 18); // scale to 18 decimals
  return monthly18 / BigInt(SECONDS_PER_MONTH);
}
