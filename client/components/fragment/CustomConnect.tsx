import { usePHIIBalance } from "@/hooks/usePHIIBalance";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export function CustomConnect() {
  const { address } = useAccount();
  const { formatted: formattedPHII } = usePHIIBalance(address);

  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, openAccountModal, mounted }) => {
        if (!mounted || !account)
          return (
            <button
              onClick={openConnectModal}
              className="bg-gradient-to-r from-[#F9140D] to-[#D10F08] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Connect Wallet
            </button>
          );

        return (
          <button
            onClick={openAccountModal}
            className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 hover:border-[#F9140D] hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              {/* PHII Balance Section */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#F9140D] to-[#D10F08] rounded-lg">
                <span className="text-white font-bold text-sm">
                  {Number(formattedPHII).toFixed(4)}
                </span>
                <span className="text-white/90 text-xs font-medium">PHII</span>
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-300 group-hover:bg-[#F9140D] transition-colors" />

              {/* Address Section */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-gray-700 font-semibold text-sm">
                  {account.displayName}
                </span>
              </div>
            </div>
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
