"use client";

import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function WalletGuard({ children }: { children: React.ReactNode }) {
  const { isConnected, status } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // wait until wagmi finishes checking connection
    if (status === "connecting") return;

    // allow landing page always
    if (pathname === "/") return;

    // if wallet not connected → go landing
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, status, pathname, router]);

  return <>{children}</>;
}
