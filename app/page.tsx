"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
const ExcalidrawWrapper = dynamic(
  async () => (await import("./_components/ExcalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function Home() {
  return <ExcalidrawWrapper />;
}
