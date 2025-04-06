"use client";

import { useEffect, useState } from "react";
import { AppLayout } from "../_components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AvatarCard } from "./_components/AvatarCard";
import { ProfileForm } from "./_components/ProfileForm";
import { AccountInfoCard } from "./_components/AccountInfoCard";
import { SecuritySettingsTab } from "./_components/SecuritySettingsTab";
import { PreferencesTab } from "./_components/PreferencesTab";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUser(user);
          setEmail(user.email || "");
          setDisplayName(
            user.user_metadata?.name || user.email?.split("@")[0] || ""
          );
          setAvatarUrl(user.user_metadata?.avatar_url || null);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        toast.error("无法加载用户信息");
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [supabase]);

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
  };

  const handleNameUpdate = (newName: string) => {
    setDisplayName(newName);
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">个人资料</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">个人信息</TabsTrigger>
              <TabsTrigger value="security">安全设置</TabsTrigger>
              <TabsTrigger value="preferences">偏好设置</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-2">
                <AvatarCard
                  user={user}
                  avatarUrl={avatarUrl}
                  onAvatarUpdate={handleAvatarUpdate}
                />

                <ProfileForm
                  user={user}
                  displayName={displayName}
                  email={email}
                  onNameUpdate={handleNameUpdate}
                />

                <AccountInfoCard user={user} />
              </div>
            </TabsContent>

            <TabsContent value="security">
              <SecuritySettingsTab />
            </TabsContent>

            <TabsContent value="preferences">
              <PreferencesTab />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AppLayout>
  );
}
