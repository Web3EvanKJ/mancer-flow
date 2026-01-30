"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { getUser } from "@/utils/userApi";

type Role = "EMPLOYER" | "EMPLOYEE";

export function useRequireRole(requiredRole: Role) {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConnected || !address) {
      router.replace("/");
      return;
    }

    async function checkRole() {
      try {
        const user = await getUser(address as string);

        if (!user?.role) {
          router.replace("/role");
          return;
        }

        if (user.role !== requiredRole) {
          // Wrong role → redirect to correct area
          if (user.role === "EMPLOYER") {
            router.replace("/employer/streams");
          } else {
            router.replace("/me");
          }
          return;
        }

        setLoading(false);
      } catch {
        router.replace("/role");
      }
    }

    checkRole();
  }, [address, isConnected, requiredRole, router]);

  return loading;
}
