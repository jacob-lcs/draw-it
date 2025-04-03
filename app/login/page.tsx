import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/LoginForm";
import { BaseLayout } from "../_components/BaseLayout";

export default async function LoginPage() {
  // Check if user is already logged in
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  // If user is logged in, redirect to homepage
  if (data?.user && !error) {
    redirect("/");
  }

  return (
    <BaseLayout>
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
}
