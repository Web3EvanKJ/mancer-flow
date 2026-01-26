"use client";

import { EmployeeStat } from "@/components/fragment/EmployeeStat";
import { EmployeeStatusBadge } from "@/components/fragment/EmployeeStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Wallet,
  Clock,
  ArrowDownToLine,
  User,
  TrendingUp,
} from "lucide-react";

export default function MePage() {
  // ---------------- MOCK DATA ----------------
  const streams = [
    {
      id: 12,
      sender: "0xE91a...4F22",
      token: "PHII",
      ratePerSecond: "0.00042",
      withdrawable: "185 PHII",
      lastPaid: "2 hours ago",
      status: "Active",
    },
    {
      id: 19,
      sender: "0xA33b...9C10",
      token: "PHII",
      ratePerSecond: "0.00018",
      withdrawable: "0 PHII",
      lastPaid: "Paused",
      status: "Paused",
    },
    {
      id: 27,
      sender: "0x91F2...7A0E",
      token: "PHII",
      ratePerSecond: "0.00055",
      withdrawable: "1,220 PHII",
      lastPaid: "1 day ago",
      status: "Voided",
    },
  ];

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
            <Card
              key={stream.id}
              className="group bg-white border-2 border-gray-100 hover:border-[#F9140D]/30 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300"
            >
              <CardContent className="px-8 py-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  {/* Left */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                        <span className="text-white font-bold text-lg">
                          #{stream.id}
                        </span>
                      </div>
                      <EmployeeStatusBadge status={stream.status} />
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 font-mono">
                      <User className="w-4 h-4 text-[#F9140D]" />
                      <span className="text-sm">From</span>
                      <span className="font-semibold">{stream.sender}</span>
                    </div>
                  </div>

                  {/* Middle */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <EmployeeStat
                      label="Rate/sec"
                      value={`${stream.ratePerSecond} ${stream.token}`}
                      icon={<Zap className="w-4 h-4" />}
                    />
                    <EmployeeStat
                      label="Withdrawable"
                      value={stream.withdrawable}
                      highlight
                      icon={<Wallet className="w-4 h-4" />}
                    />
                    <EmployeeStat
                      label="Last Paid"
                      value={stream.lastPaid}
                      icon={<Clock className="w-4 h-4" />}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => alert("Mock: Withdraw custom")}
                      className="flex items-center h-12 px-6 rounded-xl border-2 border-[#F9140D] bg-white hover:bg-red-50 text-[#F9140D] font-semibold transition-all duration-300 shadow-sm hover:shadow-lg "
                    >
                      <ArrowDownToLine className="w-4 h-4 mr-2" />
                      Withdraw
                    </button>
                    <button
                      className="flex items-center h-12 px-6 rounded-xl bg-gradient-to-r from-[#F9140D] to-red-600 hover:from-red-600 hover:to-[#F9140D] text-white font-bold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300"
                      onClick={() => alert("Mock: Withdraw max")}
                    >
                      <ArrowDownToLine className="w-4 h-4 mr-2" />
                      Withdraw Max
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
