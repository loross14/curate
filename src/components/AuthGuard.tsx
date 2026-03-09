"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

// AUTH_ENABLED: flip to true once Google OAuth is configured in Supabase + Google Cloud Console
const AUTH_ENABLED = true;

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Bypass auth guard until OAuth is fully configured
  if (!AUTH_ENABLED) {
    return <>{children}</>;
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm animate-pulse">loading…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
