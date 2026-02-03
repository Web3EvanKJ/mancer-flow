import { useProtocolFee } from "@/hooks/useProtocolFee";
import { useWithdraw } from "@/hooks/useWithdraw";
import { useWithdrawMax } from "@/hooks/useWithdrawMax";
import { useEffect, useRef, useState } from "react";
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
  useEffect(() => {
    if (mode === "max") {
      setAmount(maxAmount);
    } else {
      setAmount("");
    }
  }, [mode, maxAmount]);

  const [amount, setAmount] = useState(mode === "max" ? maxAmount : "");
  const hasShownSuccess = useRef(false);

  const { address } = useAccount();
  const {
    withdraw,
    isPending: withdrawPending,
    confirming: withdrawConfirming,
    error: withdrawError,
    isSuccess: withdrawSuccess,
  } = useWithdraw();
  const {
    withdrawMax,
    isPending: withdrawMaxPending,
    confirming: withdrawMaxConfirming,
    error: withdrawMaxError,
    isSuccess: withdrawMaxSuccess,
  } = useWithdrawMax();
  const { protocolFee, isLoading: protocolFeeLoading } = useProtocolFee(
    "0xc6800342F5C0895dd4419b99Bf758b2136F1CAfe",
  );

  const feePercent = protocolFee ? Number(protocolFee) : 0;

  const numericAmount = Number(amount || 0);

  const feeAmount =
    protocolFeeLoading || !numericAmount
      ? null
      : (numericAmount * feePercent) / 100;

  const receiveAmount =
    protocolFeeLoading || !numericAmount
      ? null
      : numericAmount - (feeAmount || 0);

  const isPending = withdrawPending || withdrawMaxPending;
  const isConfirming = withdrawConfirming || withdrawMaxConfirming;
  const isSuccess = withdrawSuccess || withdrawMaxSuccess;
  const error = withdrawError || withdrawMaxError;

  useEffect(() => {
    const err = withdrawError || withdrawMaxError;
    if (!err) return;

    // @ts-ignore
    const message = err?.shortMessage || "Transaction failed";

    toast.error(message);
  }, [error]);

  useEffect(() => {
    if (open) {
      hasShownSuccess.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!isSuccess || hasShownSuccess.current) return;

    hasShownSuccess.current = true;

    toast.success("Withdrawal successful");
    onClose();
  }, [isSuccess, onClose]);

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

        <p className="text-sm text-gray-500">
          Available:{" "}
          <span className="font-semibold text-black">{maxAmount} PHII</span>
        </p>

        {/* protocol fee display */}
        <div className="mb-2 space-y-1 text-sm">
          {protocolFeeLoading ? (
            <p className="text-gray-400 animate-pulse">
              Loading protocol fee...
            </p>
          ) : (
            <>
              <p className="text-gray-500 mb-0">
                Protocol fee:{" "}
                <span className="font-semibold text-black">{feePercent}%</span>
              </p>

              <p className="text-gray-500">
                You receive:{" "}
                {amount && Number(amount) > 0 && (
                  <span className="font-semibold text-green-600">
                    {receiveAmount?.toFixed(4)} PHII
                  </span>
                )}
              </p>
            </>
          )}
        </div>

        {/* input */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-600">Amount</label>
          <div className="mt-2 flex items-center rounded-xl border-2 border-gray-200 focus-within:border-[#F9140D] transition">
            <input
              type="number"
              value={amount}
              disabled={mode === "max"}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-3 outline-none rounded-xl disabled:opacity-50 disabled:cursor-no-drop"
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
            disabled={isPending || isConfirming}
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
              : isConfirming
                ? "Confirming..."
                : "Confirm Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
}
