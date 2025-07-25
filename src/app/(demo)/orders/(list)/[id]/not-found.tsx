import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// app/orders/[id]/not-found.tsx
export default function OrderNotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
      <p className="text-gray-500 mb-8">
        The order youre looking for doesnt exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/orders">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </Button>
    </div>
  );
}
