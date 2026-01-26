"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ChevronRight, Plus } from "lucide-react";
import { StreamStatusBadge } from "@/components/fragment/StreamStatusBadge";

// --------------------
// Mock Data
// --------------------
const mockStreams = [
  {
    id: 1,
    recipient: "0xA1b2...cD3",
    token: "PHII",
    ratePerSecond: "0.000023",
    balance: "1,250.45",
    status: "Active",
  },
  {
    id: 2,
    recipient: "0xF9e8...91A",
    token: "PHII",
    ratePerSecond: "0.000012",
    balance: "320.10",
    status: "Paused",
  },
  {
    id: 3,
    recipient: "0x77C3...e21",
    token: "PHII",
    ratePerSecond: "0.000050",
    balance: "0.00",
    status: "Voided",
  },
];

export default function EmployerStreamsPage() {
  const router = useRouter();

  function createStream() {
    router.push("/employer/create");
  }

  function viewDetail(id: number) {
    router.push(`/employer/stream/${id}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white">
      <div className="mx-auto mx-auto max-w-6xl px-6 py-10 space-y-8">
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
          {mockStreams.map((stream) => (
            <Card
              key={stream.id}
              className="group bg-white border-2 border-gray-100 hover:border-[#F9140D]/30 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300"
            >
              <CardContent className="px-6 py-2">
                <div className="flex items-center justify-between">
                  {/* Left Section - Stream Info */}
                  <div className="flex items-center gap-6 flex-1">
                    {/* Stream ID Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                        <span className="text-white font-bold text-lg">
                          #{stream.id}
                        </span>
                      </div>
                    </div>

                    {/* Recipient & Token */}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                          Recipient
                        </span>
                      </div>
                      <div className="font-mono text-lg font-semibold text-gray-800">
                        {stream.recipient}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-6 h-6 rounded-full bg-[#F9140D]/10 flex items-center justify-center">
                          <span className="text-[#F9140D] text-xs font-bold">
                            Ⓟ
                          </span>
                        </div>
                        {stream.token}
                      </div>
                    </div>

                    {/* Rate */}
                    <div className="space-y-1 text-center px-4">
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        Rate / sec
                      </div>
                      <div className="text-lg font-bold text-gray-800">
                        {stream.ratePerSecond}
                      </div>
                    </div>

                    {/* Balance */}
                    <div className="space-y-1 text-center px-4">
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        Balance
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
                        {stream.balance}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex-shrink-0">
                      <StreamStatusBadge status={stream.status} />
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex-shrink-0 ml-6">
                    <button
                      onClick={() => viewDetail(stream.id)}
                      className="group/btn bg-white hover:bg-[#F9140D] text-gray-700 hover:text-white border-2 border-gray-200 hover:border-[#F9140D] px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-red-500/20 flex gap-2"
                    >
                      <span className="flex items-center gap-2">
                        View Details
                      </span>
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State Hint */}
        {mockStreams.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-[#F9140D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No streams yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first salary stream to get started
            </p>
            <button
              onClick={createStream}
              className="bg-[#F9140D] hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300"
            >
              Create Stream
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
