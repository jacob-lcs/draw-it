"use client";

import { Sidebar } from "@/components/shared/Sidebar";
import { useUserStore } from "@/lib/providers/userStoreProvider";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const supabase = createClient();
  const setBaseInfo = useUserStore((state) => state.setBaseInfo);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setBaseInfo(data.user);
      }
    }

    getUser();
  }, [supabase, setBaseInfo]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
