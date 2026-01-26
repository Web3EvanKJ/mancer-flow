"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  CircleDollarSign,
  Info,
  InfoIcon,
  User,
} from "lucide-react";
import { useCreateAndDepositStream } from "@/hooks/useCreateAndDepositStream";
import { Address } from "viem";

export default function EmployerCreateStreamPage() {
  const token = "0xc6800342F5C0895dd4419b99Bf758b2136F1CAfe"; // PHII

  const [recipient, setRecipient] = useState("");
  const [ratePerMonth, setRatePerMonth] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [transferable, setTransferable] = useState(false);

  const { createAndDeposit, isPending } = useCreateAndDepositStream();

  function handleCreate() {
    createAndDeposit({
      recipient: recipient as Address,
      token: token as Address,
      monthlyRate: ratePerMonth,
      depositAmount: initialDeposit,
      transferable,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
            Create Salary Stream
          </h1>
          <p className="text-gray-500 text-lg">
            Set up a real-time salary stream for a contributor
          </p>
        </div>

        <Card className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl shadow-red-500/5">
          <CardContent className="px-8 space-y-5">
            {/* Recipient */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <User className="text-[#F9140D] w-5" />
                Recipient Address
              </label>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="h-14 px-5 text-base border-2 border-gray-200 rounded-xl focus:border-[#F9140D] focus:ring-4 focus:ring-red-500/10 transition-all duration-300 font-mono"
              />
            </div>

            {/* Token */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#F9140D]/10 flex items-center justify-center">
                  <span className="text-[#F9140D] text-xl font-bold">Ⓟ</span>
                </div>
                Token Address
              </label>
              <div className="relative">
                <Input
                  value={token}
                  disabled
                  className="h-14 px-5 text-base border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-red-50/30 font-mono text-gray-600"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <span className="px-3 py-1 bg-[#F9140D]/10 text-[#F9140D] text-xs font-semibold rounded-full">
                    PHII
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Info className="w-3.5" />
                Defaulting to PHII token
              </p>
            </div>

            {/* Rate */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <CircleDollarSign className="text-[#F9140D] w-5" />
                Salary Rate (per month)
              </label>
              <Input
                placeholder="e.g. 1000"
                value={ratePerMonth}
                onChange={(e) => setRatePerMonth(e.target.value)}
                className="h-14 px-5 text-base border-2 border-gray-200 rounded-xl focus:border-[#F9140D] focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
              />
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Info className="w-3.5" />
                This will be converted to per-second rate on-chain
              </p>
            </div>

            {/* Initial Deposit */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                <Banknote className="text-[#F9140D] w-5" />
                Initial Deposit
              </label>
              <Input
                placeholder="e.g. 3000"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                className="h-14 px-5 text-base border-2 border-gray-200 rounded-xl focus:border-[#F9140D] focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
              />
            </div>

            {/* Transferable */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-red-50/20 p-6 shadow-sm hover:shadow-md hover:border-[#F9140D]/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <ArrowLeftRight className="text-[#F9140D] w-5" />
                    Transferable Stream
                  </label>
                  <p className="text-sm text-gray-500">
                    Allow recipient to transfer the stream NFT
                  </p>
                </div>
                <Switch
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#F9140D] data-[state=checked]:to-red-600 data-[state=unchecked]:bg-gray-300 scale-110"
                  checked={transferable}
                  onCheckedChange={setTransferable}
                />
              </div>
            </div>

            {/* Action */}
            <button
              className="group relative w-full bg-gradient-to-r from-[#F9140D] to-red-600 hover:from-red-600 hover:to-[#F9140D] text-white p-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg overflow-hidden"
              onClick={handleCreate}
              disabled={
                isPending || !recipient || !ratePerMonth || !initialDeposit
              }
            >
              {isPending ? (
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Creating Stream...
                </span>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Create & Deposit Stream
                  <ArrowRight className="w-5" />
                </span>
              )}

              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Info Footer */}
            <div className="pt-4 border-t-2 border-gray-100">
              <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <InfoIcon className="text-blue-700 w-5" />
                <div className="text-sm text-blue-700">
                  <p className="font-semibold mb-1">Before you proceed:</p>
                  <p>
                    Make sure you have sufficient PHII tokens and ETH for gas
                    fees in your wallet.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
