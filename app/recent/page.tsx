"use client";

import { AppLayout } from "../_components/AppLayout";

export default function RecentEditsPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Recent Edits</h1>
        <p className="text-muted-foreground">
          Your recently edited documents will appear here.
        </p>
      </div>
    </AppLayout>
  );
}
