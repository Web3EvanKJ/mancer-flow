"use client";

import { CenterState } from "@/components/fragment/CenterState";
import { EmployeeStreamCard } from "@/components/fragment/EmployeeStreamCard";
import { useListRecipientStreams } from "@/hooks/useListRecipientStreams";
import { Wallet, TrendingUp, Loader2, AlertTriangle } from "lucide-react";
import { useAccount } from "wagmi";

export default function MePage() {
  const { address, isConnecting } = useAccount();

  const { data, loading, error } = useListRecipientStreams(
    address as `0x${string}`,
  );

  const streams = data?.streams?.items ?? [];

  if (!address && !isConnecting) {
    return (
      <CenterState
        icon={<Wallet className="w-10 h-10 text-[#F9140D]" />}
        title="Connect your wallet"
        description="Your salary streams will appear here once connected."
      />
    );
  }

  if (loading || isConnecting) {
    return (
      <CenterState
        icon={<Loader2 className="w-10 h-10 text-[#F9140D] animate-spin" />}
        title="Loading your streams..."
        description="Fetching on-chain salary data"
      />
    );
  }

  if (error) {
    return (
      <CenterState
        icon={<AlertTriangle className="w-10 h-10 text-red-500" />}
        title="Failed to load streams"
        description="Something went wrong while fetching blockchain data."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
            My Salary Streams
          </h1>
          <p className="text-gray-500 text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#F9140D]" />
            Streams where you are the recipient
          </p>
        </div>

        {/* Stream list */}
        <div className="space-y-3">
          {streams.map((stream) => (
            <EmployeeStreamCard key={stream.id} stream={stream} />
          ))}
        </div>

        {/* Empty State */}
        {streams.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-6">
              <Wallet className="w-12 h-12 text-[#F9140D]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No streams yet
            </h3>
            <p className="text-gray-500 text-lg">
              You don't have any active salary streams
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
