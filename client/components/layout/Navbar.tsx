"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  function homePageRoute() {
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div
          onClick={homePageRoute}
          className="cursor-pointer flex items-center gap-2 text-xl font-bold"
        >
          <span className="text-[#F9140D]">Mancer</span>
        </div>

        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
