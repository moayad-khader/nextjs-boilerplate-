"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => signIn()}>
            Sign in with Provider
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
