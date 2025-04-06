"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/lib/providers/userStoreProvider";
import { Check, X } from "lucide-react";
import { useShallow } from "zustand/shallow";

export function AccountInfoCard() {
  const {
    id: userId,
    createdAt,
    lastSignInAt,
    emailConfirmedAt,
  } = useUserStore(
    useShallow((state) => ({
      id: state.baseInfo?.id,
      createdAt: state.baseInfo?.created_at,
      lastSignInAt: state.baseInfo?.last_sign_in_at,
      emailConfirmedAt: state.baseInfo?.email_confirmed_at,
    }))
  );

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>账户信息</CardTitle>
        <CardDescription>查看您的账户详情</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              账户ID
            </dt>
            <dd className="mt-1 text-sm">{userId || "无"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              账户创建时间
            </dt>
            <dd className="mt-1 text-sm">
              {createdAt ? new Date(createdAt).toLocaleString("zh-CN") : "无"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              上次登录
            </dt>
            <dd className="mt-1 text-sm">
              {lastSignInAt
                ? new Date(lastSignInAt).toLocaleString("zh-CN")
                : "无数据"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              电子邮箱验证
            </dt>
            <dd className="mt-1 text-sm flex items-center">
              {emailConfirmedAt ? (
                <span className="flex items-center text-green-600">
                  <Check size={16} className="mr-1" />
                  已验证
                </span>
              ) : (
                <span className="flex items-center text-amber-600">
                  <X size={16} className="mr-1" />
                  未验证
                </span>
              )}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
