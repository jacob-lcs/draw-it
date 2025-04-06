"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Laptop, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const themeOptions = [
  { value: "auto", label: "自动", icon: Laptop },
  { value: "light", label: "浅色", icon: Sun },
  { value: "dark", label: "深色", icon: Moon },
];

export function PreferencesTab() {
  const [theme, setTheme] = useState<string>("auto");

  // 页面加载时获取当前主题设置
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "auto";
    setTheme(storedTheme);
  }, []);

  // 设置主题
  const setThemePreference = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // 应用主题到文档
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (newTheme === "auto") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.add("light");
      }
    } else {
      root.classList.add(newTheme);
    }

    toast.success(
      `已切换到${themeOptions.find((t) => t.value === newTheme)?.label}模式`
    );
  };

  // 获取当前主题对应的选项
  const currentThemeOption =
    themeOptions.find((t) => t.value === theme) || themeOptions[0];
  const ThemeIcon = currentThemeOption.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle>界面偏好</CardTitle>
        <CardDescription>自定义您的使用体验</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium">深色模式</h4>
            <p className="text-sm text-muted-foreground">调整界面亮度</p>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ThemeIcon size={16} />
                  {currentThemeOption.label}
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {themeOptions.map((option) => {
                  const OptionIcon = option.icon;
                  return (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setThemePreference(option.value)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <OptionIcon size={16} />
                      {option.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
