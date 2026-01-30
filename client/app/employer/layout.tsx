"use client";

import { useRequireRole } from "@/hooks/useRequireRole";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loading = useRequireRole("EMPLOYER");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking permissions...
      </div>
    );
  }

  return <>{children}</>;
}
