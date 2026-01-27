import { useWithdraw } from "@/hooks/useWithdraw";
import { useWithdrawMax } from "@/hooks/useWithdrawMax";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export function WithdrawModal({
  open,
  onClose,
  maxAmount,
  mode,
  streamId,
}: {
  open: boolean;
  onClose: () => void;
  maxAmount: string;
  mode: "custom" | "max";
  streamId: bigint;
}) {
  const [amount, setAmount] = useState(mode === "max" ? maxAmount : "");

  const { address } = useAccount();
  const {
    withdraw,
    isPending,
    confirming,
    error: withdrawError,
    isSuccess,
  } = useWithdraw();
  const { withdrawMax, error: withdrawMaxError } = useWithdrawMax();

  useEffect(() => {
    const err = withdrawError || withdrawMaxError;
    if (!err) return;

    console.log(err.name);

    // @ts-ignore
    const message = err?.shortMessage || "Transaction failed";

    toast.error(message);
  }, [withdrawError, withdrawMaxError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Withdrawal successful");
      onClose();
    }
  }, [isSuccess]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-red-100 animate-in fade-in zoom-in-95">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
          Withdraw PHII
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Available:{" "}
          <span className="font-semibold text-black">{maxAmount} PHII</span>
        </p>

        {/* input */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-600">Amount</label>
          <div className="mt-2 flex items-center rounded-xl border-2 border-gray-200 focus-within:border-[#F9140D] transition">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-3 outline-none rounded-xl"
            />
            <span className="pr-4 text-sm font-semibold text-gray-500">
              PHII
            </span>
          </div>
        </div>

        {/* actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            disabled={isPending || confirming}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#F9140D] to-red-600 text-white font-bold shadow-lg disabled:opacity-50"
            onClick={() => {
              if (!address) return;

              if (mode === "max") {
                withdrawMax(streamId, address);
              } else {
                withdraw(streamId, address, amount);
              }
            }}
          >
            {isPending
              ? "Loading..."
              : confirming
                ? "Confirming..."
                : "Confirm Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
}
