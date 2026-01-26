"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Wallet,
  Clock,
  TrendingUp,
  DollarSign,
  Percent,
  Plus,
  Pause,
  Play,
  Settings,
  RotateCcw,
  Trash2,
  CheckCircle2,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import { StreamStat } from "@/components/fragment/StreamStat";
import { StreamAction } from "@/components/fragment/StreamAction";

export default function EmployerStreamDetailPage() {
  const params = useParams();
  const streamId = params.id;

  // ---------------- MOCK DATA ----------------
  const stream = {
    id: streamId,
    recipient: "0xA1b2...C3d4",
    token: "PHII",
    ratePerSecond: "0.00038 PHII",
    balance: "2,500 PHII",
    withdrawable: "320 PHII",
    refundable: "1,980 PHII",
    depletionTime: "2026-02-12 14:32",
    protocolFee: "2%",
    status: "Active",
    events: [
      { type: "Create", detail: "Stream created", time: "2 days ago" },
      { type: "Deposit", detail: "Deposited 3,000 PHII", time: "2 days ago" },
      {
        type: "Withdraw",
        detail: "Employee withdrew 180 PHII",
        time: "1 day ago",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
              Stream #{stream.id}
            </h1>
            <p className="text-gray-500 text-lg font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-[#F9140D] rounded-full"></span>
              Recipient: {stream.recipient}
            </p>
          </div>
          <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            {stream.status}
          </div>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StreamStat
            label="Rate / sec"
            value={stream.ratePerSecond}
            icon={<Zap className="w-5 h-5" />}
          />
          <StreamStat
            label="Balance"
            value={stream.balance}
            icon={<Wallet className="w-5 h-5" />}
          />
          <StreamStat
            label="Depletion Time"
            value={stream.depletionTime}
            icon={<Clock className="w-5 h-5" />}
          />
        </div>

        {/* Financials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StreamStat
            label="Withdrawable"
            value={stream.withdrawable}
            highlight
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StreamStat
            label="Refundable"
            value={stream.refundable}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <StreamStat
            label="Protocol Fee"
            value={stream.protocolFee}
            icon={<Percent className="w-5 h-5" />}
          />
        </div>

        {/* Actions */}
        <Card className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl shadow-red-500/5">
          <CardContent className="px-8 py-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StreamAction
                label="Deposit"
                icon={<Plus className="w-4 h-4" />}
              />
              <StreamAction
                label="Pause"
                icon={<Pause className="w-4 h-4" />}
              />
              <StreamAction
                label="Restart"
                icon={<Play className="w-4 h-4" />}
              />
              <StreamAction
                label="Adjust Rate"
                icon={<Settings className="w-4 h-4" />}
              />
              <StreamAction
                label="Refund"
                icon={<RotateCcw className="w-4 h-4" />}
              />
              <StreamAction
                label="Refund Max"
                destructive
                icon={<ArrowDownToLine className="w-4 h-4" />}
              />
              <StreamAction
                label="Void Stream"
                destructive
                icon={<Trash2 className="w-4 h-4" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl shadow-red-500/5">
          <CardContent className="px-8 py-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              Activity Timeline
            </h2>

            <div className="space-y-1">
              {stream.events.map((e, i) => (
                <div
                  key={i}
                  className="group relative flex items-center justify-between p-5 rounded-xl hover:bg-gradient-to-r hover:from-red-50/50 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-[#F9140D]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {e.type === "Create" && (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                      {e.type === "Deposit" && (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <ArrowUpFromLine className="w-5 h-5 text-green-600" />
                        </div>
                      )}
                      {e.type === "Withdraw" && (
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <ArrowDownToLine className="w-5 h-5 text-orange-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">
                        {e.type}
                      </div>
                      <div className="text-sm text-gray-500">{e.detail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-400 font-medium px-3 py-1 bg-gray-100 rounded-full">
                      {e.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
