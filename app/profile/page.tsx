"use client";

import { AppLayout } from "../_components/AppLayout";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <p className="text-muted-foreground">
          Your profile information and settings will appear here.
        </p>
      </div>
    </AppLayout>
  );
}
