import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RechartsDemo from "@/components/RechartsDemo";

export default function OrganizationSettingsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Organization settings form goes here */}
          <div className="text-muted-foreground">
            Organization settings form placeholder.
          </div>
          <div className="mt-4">
            <RechartsDemo />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
