"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 rounded-lg bg-white/10 text-white/80 font-body text-[13px] font-medium hover:bg-white/20 transition-colors border border-white/10"
    >
      Sign Out
    </button>
  );
}
