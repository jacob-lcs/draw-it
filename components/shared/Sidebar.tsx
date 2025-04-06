"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Clock,
  FileText,
  Trash,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/providers/userStoreProvider";
import { useShallow } from "zustand/shallow";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showText, setShowText] = useState(!isCollapsed);
  const pathname = usePathname();
  const user = useUserStore(
    useShallow((state) => ({
      avatar: state.baseInfo?.user_metadata?.avatar_url,
      name: state.baseInfo?.user_metadata?.name,
    }))
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isCollapsed) {
      // 延迟显示文字，直到动画基本完成
      timeout = setTimeout(() => setShowText(true), 150);
    } else {
      // 收起时立即隐藏文字
      setShowText(false);
    }

    return () => clearTimeout(timeout);
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const NavItem = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: any;
    label: string;
  }) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={cn(
          "flex items-center rounded-md transition-all duration-200 relative group",
          isCollapsed ? "justify-center p-3" : "px-3 py-2.5 gap-3",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 flex items-center justify-center transition-all",
            isActive
              ? "text-primary"
              : "text-foreground/70 group-hover:text-foreground"
          )}
        >
          <Icon size={isCollapsed ? 20 : 18} />
        </div>

        {showText && (
          <span
            className={cn(
              "text-sm transition-opacity duration-200",
              isActive
                ? "text-primary"
                : "text-foreground/70 group-hover:text-foreground"
            )}
          >
            {label}
          </span>
        )}

        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <div
      className={cn(
        "border-r h-screen bg-background/80 backdrop-blur-sm transition-all duration-300 flex flex-col shadow-sm relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* 折叠按钮 */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "absolute -right-3 top-20 z-10 size-6 rounded-full border shadow-sm bg-background hover:bg-accent hover:text-accent-foreground",
          "flex items-center justify-center p-0"
        )}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </Button>

      {/* 标题区域 */}
      <div className="p-4 flex items-center justify-between border-b">
        {showText ? (
          <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Draw It
          </h2>
        ) : (
          <div className="mx-auto">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto py-2 px-2">
        {/* 用户资料 */}
        <div className="mb-6 mt-2">
          <Link
            href="/profile"
            className={cn(
              "flex rounded-lg transition-all duration-200 hover:bg-accent group",
              isCollapsed ? "justify-center p-3" : "items-center gap-3 p-3"
            )}
          >
            <div className="flex-shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={cn(
                    "rounded-full border-2 border-primary/20 transition-all duration-300",
                    isCollapsed ? "h-8 w-8" : "h-9 w-9"
                  )}
                />
              ) : (
                <div
                  className={cn(
                    "rounded-full bg-muted flex items-center justify-center border-2 border-primary/20 transition-all duration-300",
                    isCollapsed ? "h-8 w-8" : "h-9 w-9"
                  )}
                >
                  <User size={16} />
                </div>
              )}
            </div>
            {showText && (
              <div className="flex-1 truncate">
                <p className="text-sm font-medium">{user?.name || "访客"}</p>
                <p className="text-xs text-muted-foreground truncate">
                  查看个人资料
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* 导航链接 */}
        <div className="space-y-1.5 px-1">
          <NavItem href="/" icon={Home} label="首页" />
          <NavItem href="/recent" icon={Clock} label="最近编辑" />
          <NavItem href="/documents" icon={FileText} label="我的文档" />
          <NavItem href="/trash" icon={Trash} label="回收站" />
        </div>
      </div>

      {/* 底部版权信息 */}
      {showText && (
        <div className="p-3 border-t text-xs text-center text-muted-foreground">
          Draw It © {new Date().getFullYear()}
        </div>
      )}
    </div>
  );
}
