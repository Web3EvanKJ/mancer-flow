"use client";

import { StreamStat } from "@/components/fragment/StreamStat";
import {
  Zap,
  Wallet,
  Clock,
  TrendingUp,
  DollarSign,
  Percent,
} from "lucide-react";
import { formatToken } from "@/utils/formatToken";

export function StreamStatsSection({
  stream,
  withdrawable,
  refundable,
  depletionTime,
  protocolFee,
}: {
  stream: any;
  withdrawable: bigint;
  refundable: bigint;
  depletionTime: bigint;
  protocolFee: bigint | undefined;
}) {
  return (
    <>
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StreamStat
          label="Rate / sec"
          value={`${formatToken(stream.ratePerSecond)} PHII`}
          icon={<Zap className="w-5 h-5" />}
        />
        <StreamStat
          label="Balance"
          value={`${formatToken(stream.balance)} PHII`}
          icon={<Wallet className="w-5 h-5" />}
        />
        <StreamStat
          label="Depletion Time"
          value={new Date(Number(depletionTime) * 1000).toLocaleString()}
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      {/* Financials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StreamStat
          label="Withdrawable"
          value={`${formatToken(withdrawable)} PHII`}
          highlight
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StreamStat
          label="Refundable"
          value={`${formatToken(refundable)} PHII`}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StreamStat
          label="Protocol Fee"
          value={`${protocolFee?.toString()!}%`}
          icon={<Percent className="w-5 h-5" />}
        />
      </div>
    </>
  );
}
