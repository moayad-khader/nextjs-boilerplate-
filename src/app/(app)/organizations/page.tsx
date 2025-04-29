import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RechartsDemo from "@/components/RechartsDemo";

export default function OrganizationsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          {/* List of user's organizations goes here */}
          <div className="text-muted-foreground">
            Organizations list placeholder.
          </div>
          <div className="mt-4">
            <RechartsDemo />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
