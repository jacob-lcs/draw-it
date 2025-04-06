import { ThemeProvider } from "@/components/shared/ThemeProvider";
import TopLoader from "@/components/shared/TopLoader";
import { Toaster } from "@/components/ui/sonner";
import { UserStoreProvider } from "@/lib/providers/userStoreProvider";
import type { Metadata } from "next";
import { AppLayout } from "../_components/AppLayout";
import "../globals.css";

export const metadata: Metadata = {
  title: "Draw It",
  description: "Draw It",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"antialiased"}>
        <ThemeProvider>
          <UserStoreProvider>
            <AppLayout>
              {children}
              <TopLoader />
              <Toaster />
            </AppLayout>
          </UserStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
