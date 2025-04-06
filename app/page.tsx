"use client";

import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  async () => (await import("./_components/ExcalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function Home() {
  return <ExcalidrawWrapper />;
}
