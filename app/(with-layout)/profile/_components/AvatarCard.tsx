"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/lib/providers/userStoreProvider";
import { createClient } from "@/utils/supabase/client";
import { Camera, Check, Loader2, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

interface AvatarCardProps {
  avatarUrl: string | null;
  onAvatarUpdate: (newAvatarUrl: string) => void;
}

export function AvatarCard({ avatarUrl, onAvatarUpdate }: AvatarCardProps) {
  const [updating, setUpdating] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { id: userId } = useUserStore(
    useShallow((state) => ({
      id: state.baseInfo?.id,
    }))
  );

  const supabase = createClient();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith("image/")) {
      toast.error("请选择图片文件");
      return;
    }

    // 验证文件大小，限制为 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error("图片大小不能超过2MB");
      return;
    }

    setAvatarFile(file);

    // 创建预览
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const cancelAvatarChange = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !userId) return;

    try {
      setUpdating(true);

      // 为头像生成唯一文件名
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${userId}/${fileName}`;

      // 上传到 Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profile")
        .upload(filePath, avatarFile);

      if (uploadError) throw uploadError;

      // 获取公共URL
      const { data: publicUrlData } = supabase.storage
        .from("profile")
        .getPublicUrl(filePath);

      const newAvatarUrl = publicUrlData.publicUrl;

      // 更新用户元数据
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: newAvatarUrl },
      });

      if (updateError) throw updateError;

      onAvatarUpdate(newAvatarUrl);
      setAvatarFile(null);
      setAvatarPreview(null);

      toast.success("头像已更新");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("上传头像失败");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>头像</CardTitle>
        <CardDescription>更改您的个人头像</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative mb-6">
          {avatarPreview || avatarUrl ? (
            <img
              src={avatarPreview || avatarUrl || ""}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-2 border-primary/20">
              <User size={48} className="text-muted-foreground" />
            </div>
          )}

          {!avatarFile && (
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground h-9 w-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <Camera size={16} />
              <span className="sr-only">上传头像</span>
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          )}
        </div>

        {avatarFile && (
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              onClick={uploadAvatar}
              disabled={updating}
              className="flex gap-1"
            >
              {updating ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Check size={14} />
              )}
              确认
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={cancelAvatarChange}
              className="flex gap-1"
            >
              <X size={14} />
              取消
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
