"use client";

import { AppLayout } from "../_components/AppLayout";

export default function TrashPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Trash</h1>
        <p className="text-muted-foreground">
          Your deleted documents will appear here.
        </p>
      </div>
    </AppLayout>
  );
}
