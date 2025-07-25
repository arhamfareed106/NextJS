// app/carriage/[id]/page.tsx

// app/carriage/[id]/page.tsx
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackingDetails } from "@/components/carriage/tracking-details";
import { DeliveryMap } from "@/components/carriage/delivery-map";
import { OrderInfo } from "@/components/carriage/order-info";
import { CarriageOrder } from "@/types/carriage.types";
import { ordersData } from "@/lib/data/mock-carriage";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { ContentLayout } from "@/components/admin-panel/content-layout";

async function getCarriageOrder(id: string): Promise<CarriageOrder | null> {
  // In a real application, you would fetch this data from an API
  const order = ordersData.find((order) => order.id === id);

  if (!order) {
    return null;
  }

  // Add demo tracking updates
  return {
    ...order,
    trackingUpdates: [
      {
        id: "1",
        carriageOrderId: id,
        status: "waiting",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        location: order.startingRoute,
        description: "Package picked up",
      },
      {
        id: "2",
        carriageOrderId: id,
        status: order.status,
        timestamp: new Date(),
        location:
          order.status === "delivered" ? order.endingRoute : "In Transit",
        description:
          order.status === "delivered"
            ? "Package delivered"
            : "In transit to destination",
      },
    ],
    vehicle: {
      id: `VH-${id}`,
      vehicleNumber: `TR-${Math.floor(Math.random() * 900) + 100}-XY`,
      status: order.status,
      currentLocation: {
        lat: 50.1109,
        lng: 8.6821,
        address:
          order.status === "delivered" ? order.endingRoute : "In Transit",
      },
      driver: {
        id: `DRV-${id}`,
        name: "John Doe",
        phone: "+1234567890",
      },
    },
  };
}

export default async function CarriageDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const order = await getCarriageOrder(params.id);

  if (!order) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Carriage", href: `/carriage/` },
    { label: `Carriage ${order.id}`, href: `/carriage/${order.id}` },
  ];

  return (
    <ContentLayout title={`Carriage`}>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mx-auto py-4 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderInfo order={order} />
            </CardContent>
          </Card>

          {/* Vehicle & Driver Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <DeliveryMap order={order} />
            </CardContent>
          </Card>
        </div>

        {/* Tracking Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Tracking History</CardTitle>
          </CardHeader>
          <CardContent>
            <TrackingDetails updates={order.trackingUpdates} />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
