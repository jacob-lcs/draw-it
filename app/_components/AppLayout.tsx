"use client";

import { Sidebar } from "@/components/shared/Sidebar";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [user, setUser] = useState<{ avatar?: string; name: string } | null>(
    null
  );
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const { id, email, user_metadata } = data.user;
        // Get user profile info - you might need to adjust this based on your data structure
        setUser({
          name: user_metadata?.name || email?.split("@")[0] || "User",
          avatar: user_metadata?.avatar_url,
        });
      }
    }

    getUser();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
