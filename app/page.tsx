"use client";

import dynamic from "next/dynamic";
import { BaseLayout } from "./_components/BaseLayout";

const ExcalidrawWrapper = dynamic(
  async () => (await import("./_components/ExcalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <BaseLayout>
      <ExcalidrawWrapper />
    </BaseLayout>
  );
}
