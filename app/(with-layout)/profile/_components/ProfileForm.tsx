"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/providers/userStoreProvider";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

interface ProfileFormProps {
  displayName: string;
  email: string;
  onNameUpdate: (newName: string) => void;
}

export function ProfileForm({
  displayName: initialDisplayName,
  email,
  onNameUpdate,
}: ProfileFormProps) {
  const [updating, setUpdating] = useState(false);
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const { id: userId } = useUserStore(
    useShallow((state) => ({
      id: state.baseInfo?.id,
    }))
  );

  const supabase = createClient();

  const updateProfile = async () => {
    if (!userId) return;

    try {
      setUpdating(true);

      const { error } = await supabase.auth.updateUser({
        data: { name: displayName },
      });

      if (error) throw error;

      onNameUpdate(displayName);
      toast.success("个人资料已更新");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("更新个人资料失败");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>个人信息</CardTitle>
        <CardDescription>更新您的个人资料信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="display-name">昵称</Label>
          <Input
            id="display-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="输入您的昵称"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">电子邮箱</Label>
          <Input id="email" value={email} disabled className="bg-muted/50" />
          <p className="text-xs text-muted-foreground">邮箱地址不可更改</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={updateProfile}
          disabled={
            updating ||
            !displayName.trim() ||
            displayName === initialDisplayName
          }
          className="ml-auto"
        >
          {updating ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : null}
          保存更改
        </Button>
      </CardFooter>
    </Card>
  );
}
