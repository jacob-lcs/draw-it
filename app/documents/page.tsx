"use client";

import { AppLayout } from "../_components/AppLayout";

export default function DocumentsPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Documents</h1>
        <p className="text-muted-foreground">
          Your documents will appear here.
        </p>
      </div>
    </AppLayout>
  );
}
