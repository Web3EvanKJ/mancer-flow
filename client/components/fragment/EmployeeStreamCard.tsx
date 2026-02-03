"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EmployeeStat } from "@/components/fragment/EmployeeStat";
import { EmployeeStatusBadge } from "@/components/fragment/EmployeeStatusBadge";
import { Zap, Wallet, Clock, ArrowDownToLine, User } from "lucide-react";
import { formatUnits } from "viem";
import { useStreamStatus } from "@/hooks/useStreamStatus";
import { useStreamData } from "@/hooks/useStreamData";
import { StreamRecipientItem } from "@/graphql/types";
import { useWithdrawable } from "@/hooks/useWithdrawable";
import { useLastWithdrawal } from "@/hooks/useLastWithdrawal";
import { useState } from "react";
import { WithdrawModal } from "../layout/WithdrawModal";
import { timeAgo } from "@/utils/time";

export function EmployeeStreamCard({
  stream,
}: {
  stream: StreamRecipientItem;
}) {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawMode, setWithdrawMode] = useState<"custom" | "max">("custom");

  const { status, isLoading: statusLoading } = useStreamStatus(
    BigInt(stream.id),
  );
  const { data: streamData, isLoading: dataLoading } = useStreamData(
    BigInt(stream.id),
  );

  const { withdrawable, isLoading: withdrawableLoading } = useWithdrawable(
    BigInt(stream.id),
  );

  const { data: lastPaid, loading: lastPaidLoading } = useLastWithdrawal(
    Number(stream.id),
  );

  if (
    dataLoading ||
    statusLoading ||
    withdrawableLoading ||
    lastPaidLoading ||
    !streamData ||
    status === undefined ||
    withdrawable === undefined ||
    lastPaid === undefined
  ) {
    return (
      <Card className="rounded-3xl p-8">
        <CardContent>Loading stream...</CardContent>
      </Card>
    );
  }

  const withdrawableFormatted = Number(formatUnits(withdrawable, 18));
  const isZeroWithdrawable = withdrawableFormatted <= 0;

  return (
    <Card className="group bg-white border-2 border-gray-100 hover:border-[#F9140D]/30 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300">
      <CardContent className="px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* LEFT */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                <span className="text-white font-bold text-lg">
                  #{stream.id}
                </span>
              </div>

              <EmployeeStatusBadge status={status!} />
            </div>

            <div className="flex items-center gap-2 text-gray-600 font-mono">
              <User className="w-4 h-4 text-[#F9140D]" />
              <span className="text-sm">From</span>
              <span className="font-semibold">
                {streamData.sender.slice(0, 6)}...{streamData.sender.slice(-4)}
              </span>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <EmployeeStat
              label="Rate/sec"
              value={`${Number(formatUnits(BigInt(streamData.ratePerSecond), 18)).toFixed(9)} PHII`}
              icon={<Zap className="w-4 h-4" />}
            />
            <EmployeeStat
              label="Withdrawable"
              value={`${Number(formatUnits(withdrawable!, 18)).toFixed(3)} PHII`}
              highlight
              icon={<Wallet className="w-4 h-4" />}
            />
            <EmployeeStat
              label="Last Paid"
              value={
                lastPaid.streamEvents.items[0]?.timestamp
                  ? timeAgo(lastPaid.streamEvents.items[0]?.timestamp)
                  : "-"
              }
              icon={<Clock className="w-4 h-4" />}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => {
                setWithdrawMode("custom");
                setIsWithdrawOpen(true);
              }}
              disabled={isZeroWithdrawable}
              className="flex items-center h-12 px-6 rounded-xl border-2 border-[#F9140D] bg-white hover:bg-red-50 text-[#F9140D] font-semibold transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50"
            >
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Withdraw
            </button>

            <button
              onClick={() => {
                setWithdrawMode("max");
                setIsWithdrawOpen(true);
              }}
              disabled={isZeroWithdrawable}
              className="flex items-center h-12 px-6 rounded-xl bg-gradient-to-r from-[#F9140D] to-red-600 text-white font-bold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50"
            >
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Withdraw Max
            </button>
          </div>
        </div>
      </CardContent>

      <WithdrawModal
        open={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        maxAmount={Number(formatUnits(withdrawable, 18)).toFixed(4)}
        mode={withdrawMode}
        streamId={BigInt(stream.id)}
      />
    </Card>
  );
}
