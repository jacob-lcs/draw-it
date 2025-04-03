"use client";

import dynamic from "next/dynamic";
import { AppLayout } from "./_components/AppLayout";

const ExcalidrawWrapper = dynamic(
  async () => (await import("./_components/ExcalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <AppLayout>
      <ExcalidrawWrapper />
    </AppLayout>
  );
}
