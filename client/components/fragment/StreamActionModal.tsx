"use client";

import { useStreamActions } from "@/hooks/useStreamAction";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function StreamActionModal({
  type,
  streamId,
  recipient,
  onClose,
}: {
  type: "deposit" | "restart" | "adjust" | "refund";
  streamId: bigint;
  recipient: `0x${string}`;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");
  const {
    depositStream,
    restartStream,
    adjustRate,
    refundStream,
    isPending,
    approvePending,
  } = useStreamActions();

  const config = {
    deposit: {
      title: "Deposit PHII",
      label: "Amount to deposit",
      button: "Confirm Deposit",
    },
    restart: {
      title: "Restart Stream",
      label: "New monthly salary",
      button: "Restart Stream",
    },
    adjust: {
      title: "Adjust Rate",
      label: "New monthly salary",
      button: "Update Rate",
    },
    refund: {
      title: "Refund Funds",
      label: "Amount to refund",
      button: "Confirm Refund",
    },
  }[type];

  // ---------------- VALIDATION ----------------
  function validate() {
    if (!value || Number(value) <= 0) {
      toast.error("Enter a valid number greater than 0");
      return false;
    }

    if (isNaN(Number(value))) {
      toast.error("Invalid number");
      return false;
    }

    return true;
  }

  // ---------------- ACTION HANDLER ----------------
  async function handleConfirm() {
    if (!validate()) return;

    try {
      if (type === "deposit") {
        await depositStream({ streamId, amount: value, recipient });
      }

      if (type === "restart") {
        await restartStream({ streamId, monthlyRate: value });
      }

      if (type === "adjust") {
        await adjustRate({ streamId, monthlyRate: value });
      }

      if (type === "refund") {
        await refundStream({ streamId, amount: value });
      }

      onClose();
    } catch {}
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{config.title}</h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Input */}
        <div className="space-y-3 mb-6">
          <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            {config.label}
          </label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0.0"
            disabled={isPending || approvePending}
            className="w-full h-14 px-5 rounded-xl border-2 border-gray-200 focus:border-[#F9140D] focus:ring-4 focus:ring-red-500/10 outline-none text-lg font-semibold"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleConfirm}
          disabled={isPending || approvePending}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-[#F9140D] to-red-600 text-white font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isPending || approvePending ? "Processing..." : config.button}
        </button>
      </div>
    </div>
  );
}
