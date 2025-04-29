import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RechartsDemo from "@/components/RechartsDemo";

export default function VdaPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for chat history */}
      <aside className="w-64 bg-muted p-4 border-r">
        <Card>
          <CardHeader>
            <CardTitle>Chat History</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chat history list placeholder */}
            <div className="text-muted-foreground">Chat history list</div>
          </CardContent>
        </Card>
      </aside>
      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* User/Agent Messages placeholder */}
          <div className="space-y-2">
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-lg p-3 w-fit max-w-xs">
                User message
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-secondary text-secondary-foreground rounded-lg p-3 w-fit max-w-xs">
                Agent message
              </div>
            </div>
          </div>
          {/* Narrative placeholder */}
          <div className="mt-4 text-muted-foreground">
            Narrative placeholder
          </div>
          <div className="mt-4">
            <RechartsDemo />
          </div>
        </div>
        {/* Chat input */}
        <form className="p-4 border-t flex gap-2">
          <input
            type="text"
            className="flex-1 rounded border px-3 py-2 focus:outline-none focus:ring"
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </form>
      </main>
    </div>
  );
}
