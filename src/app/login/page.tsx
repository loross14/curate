"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { CurateLogo } from "@/components/CurateLogo";

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm animate-pulse">loading…</p>
      </div>
    );
  }

  return (
    <div className="h-dvh flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
          <CurateLogo variant="full" size="lg" />
        </div>
        <p className="text-sm text-zinc-500 mb-10 font-mono">
          turn long-form content into ship-ready clips
        </p>
        <button
          onClick={signIn}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-3 px-6 rounded-lg transition-colors"
        >
          sign in with google
        </button>
        <p className="text-[11px] text-zinc-600 mt-6 font-mono">
          invite only — contact logan for access
        </p>
      </div>
    </div>
  );
}
