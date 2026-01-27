"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Plus, Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { useListSenderStreams } from "@/hooks/useListSenderStreams";
import { StreamRow } from "@/components/layout/StreamRow";
import { CenterState } from "@/components/fragment/CenterState";

export default function EmployerStreamsPage() {
  const router = useRouter();
  const { address, isConnecting } = useAccount();

  const { data, loading, error } = useListSenderStreams(
    address as `0x${string}`,
  );

  const streams = data?.streams?.items ?? [];

  function createStream() {
    router.push("/employer/create");
  }

  if (!address && !isConnecting) {
    return (
      <CenterState
        icon={<Wallet className="w-10 h-10 text-[#F9140D]" />}
        title="Connect your wallet"
        description="Your created salary streams will appear here."
      />
    );
  }

  if (loading || isConnecting) {
    return (
      <CenterState
        icon={<Loader2 className="w-10 h-10 text-[#F9140D] animate-spin" />}
        title="Loading employer streams..."
        description="Fetching on-chain stream data"
      />
    );
  }

  if (error) {
    return (
      <CenterState
        icon={<AlertTriangle className="w-10 h-10 text-red-500" />}
        title="Failed to load streams"
        description="Something went wrong while reading blockchain data."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
              Employer Dashboard
            </h1>
            <p className="text-gray-500 text-lg">
              Manage salary streams you have created
            </p>
          </div>

          <button
            onClick={createStream}
            className="group relative bg-[#F9140D] hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Plus />
              Create Stream
            </span>
          </button>
        </div>

        {/* Streams Grid */}
        <div className="grid gap-4">
          {streams.map((stream) => (
            <StreamRow key={stream.id} stream={stream} />
          ))}
        </div>

        {/* Empty state */}
        {streams.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No streams yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first salary stream to get started
            </p>
            <button
              onClick={createStream}
              className="bg-[#F9140D] hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Create Stream
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
