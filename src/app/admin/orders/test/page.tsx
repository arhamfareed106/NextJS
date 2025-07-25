"use client";

import { useGetAdminOrderByIdQuery } from "@/lib/api/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestOrderPage() {
  const { data, isLoading, error } = useGetAdminOrderByIdQuery({
    path: { id: "10" },
  });

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Raw API Response Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Loading State:</h3>
              <pre className="bg-muted p-4 rounded-lg">
                {JSON.stringify({ isLoading }, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Error State:</h3>
              <pre className="bg-muted p-4 rounded-lg">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Response Data:</h3>
              <pre className="bg-muted p-4 rounded-lg">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
