"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  User,
  Clock,
  FileText,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  user: {
    avatar?: string;
    name: string;
  } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showText, setShowText] = useState(!isCollapsed);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isCollapsed) {
      // Delay showing text until animation is mostly complete
      timeout = setTimeout(() => setShowText(true), 250);
    } else {
      // Hide text immediately when collapsing
      setShowText(false);
    }

    return () => clearTimeout(timeout);
  }, [isCollapsed]);

  return (
    <div
      className={`border-r h-screen bg-background transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {showText && <h2 className="font-semibold">Draw It</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={isCollapsed ? "mx-auto" : "ml-auto"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        {/* User Profile */}
        <div className="px-3 py-2 mb-6">
          <Link
            href="/profile"
            className={
              isCollapsed
                ? "flex justify-center items-center p-2 rounded-md hover:bg-muted transition-colors"
                : "flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
            }
          >
            <div className="flex-shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <User size={16} />
                </div>
              )}
            </div>
            {showText && (
              <div className="flex-1 truncate">
                <p className="text-sm font-medium">{user?.name || "Guest"}</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          <Link
            href="/recent"
            className={
              isCollapsed
                ? "flex justify-center items-center p-2 rounded-md hover:bg-muted transition-colors"
                : "flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
            }
          >
            <Clock size={18} />
            {showText && <span className="text-sm">Recent Edits</span>}
          </Link>
          <Link
            href="/documents"
            className={
              isCollapsed
                ? "flex justify-center items-center p-2 rounded-md hover:bg-muted transition-colors"
                : "flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
            }
          >
            <FileText size={18} />
            {showText && <span className="text-sm">My Documents</span>}
          </Link>
          <Link
            href="/trash"
            className={
              isCollapsed
                ? "flex justify-center items-center p-2 rounded-md hover:bg-muted transition-colors"
                : "flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
            }
          >
            <Trash size={18} />
            {showText && <span className="text-sm">Trash</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
}
