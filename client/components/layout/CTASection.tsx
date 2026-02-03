"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

export function CTASection() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [triedClick, setTriedClick] = useState(false);

  function launchApp() {
    if (!isConnected) {
      setTriedClick(true);
      return;
    }
    router.push("/role");
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9140D]/10 via-white to-white" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
        <h2 className="text-4xl font-semibold">
          Start streaming salaries today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-600">
          Built for teams, DAOs, and protocols that want transparent payroll.
        </p>

        <div className="mt-10 ">
          <button
            onClick={launchApp}
            className="bg-[#F9140D] hover:bg-[#d9120c] text-white p-2 rounded-md font-semibold min-w-30"
          >
            Enter App
          </button>
          {triedClick && !isConnected && (
            <p className="mt-3 text-sm text-red-500 font-medium">
              Please connect your wallet using the button on the top right.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
