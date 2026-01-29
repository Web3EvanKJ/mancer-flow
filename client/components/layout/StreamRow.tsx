"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { StreamStatusBadge } from "@/components/fragment/StreamStatusBadge";
import { formatUnits } from "viem";
import { useRouter } from "next/navigation";
import { useStreamStatus } from "@/hooks/useStreamStatus";
import { useStreamData } from "@/hooks/useStreamData";

type Props = {
  stream: {
    id: string;
    recipient: string;
    token: string;
    ratePerSecond: string | number;
    balance: string | number;
    status: string;
  };
};

export function StreamRow({ stream }: Props) {
  const router = useRouter();

  const { status, isLoading: statusLoading } = useStreamStatus(
    BigInt(stream.id),
  );
  const { data, isLoading: dataLoading } = useStreamData(BigInt(stream.id));

  function viewDetail() {
    router.push(`/employer/stream/${stream.id}`);
  }

  return (
    <Card className="group bg-white border-2 border-gray-100 hover:border-[#F9140D]/30 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300">
      <CardContent className="px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            {/* Stream ID */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">#{stream.id}</span>
            </div>

            {/* Recipient */}
            <div className="flex-1">
              <div className="text-xs text-gray-400 uppercase font-semibold">
                Recipient
              </div>
              <div className="font-mono text-lg font-semibold">
                {stream.recipient.slice(0, 8)}…{stream.recipient.slice(-6)}
              </div>
            </div>

            {/* Rate */}
            <div className="text-center px-4">
              <div className="text-xs text-gray-400 uppercase font-semibold">
                Rate / sec
              </div>
              <div className="font-bold">
                {dataLoading ? (
                  <div>Loading...</div>
                ) : (
                  <span>
                    {Number(
                      formatUnits(BigInt(data.ratePerSecond), 18),
                    ).toFixed(8)}
                  </span>
                )}{" "}
              </div>
            </div>

            {/* Balance */}
            <div className="text-center px-4">
              <div className="text-xs text-gray-400 uppercase font-semibold">
                Balance
              </div>
              <div className="text-2xl font-bold text-[#F9140D]">
                {dataLoading ? (
                  <div>Loading...</div>
                ) : (
                  <span>
                    {Number(formatUnits(BigInt(data.balance), 18)).toFixed(8)}
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              {statusLoading ? (
                <span className="text-sm text-gray-400">Loading…</span>
              ) : (
                <StreamStatusBadge status={status!} />
              )}
            </div>
          </div>

          <button
            onClick={viewDetail}
            className="ml-6 bg-white hover:bg-[#F9140D] text-gray-700 hover:text-white border-2 px-6 py-3 rounded-xl transition-all"
          >
            <ChevronRight />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
