"use client";

import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b px-4 py-3">
      <div className="mx-auto flex items-center justify-between">
        <Link href="/" className="font-medium">
          Draw It
        </Link>
        <nav className="flex items-center gap-2">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
