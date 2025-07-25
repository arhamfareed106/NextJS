// app/carriage/page.tsx
import { Suspense } from "react";
import VehiclesOverview from "@/components/carriage/vehicles-overview";
import { OrdersTable } from "@/components/carriage/orders-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarriageTracking, VehicleStatus } from "@/types/carriage.types";
import { vehicleOverviewData, ordersData } from "@/lib/data/mock-carriage";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CarrierCarousel from "@/components/blocks/carrier-carousel";
import CourierCall from "./courier-call";

async function getCarriageData() {
  // Fetch your carriage data here
  return {
    vehicleOverview: [
      {
        status: "delivered" as VehicleStatus,
        percentage: 17.4,
        duration: "2hr 10min",
        totalVehicles: 12,
      },
      {
        status: "on-the-way" as VehicleStatus,
        percentage: 39.7,
        duration: "2hr 10min",
        totalVehicles: 28,
      },
      {
        status: "waiting" as VehicleStatus,
        percentage: 17.4,
        duration: "2hr 10min",
        totalVehicles: 12,
      },
      {
        status: "returning" as VehicleStatus,
        percentage: 14.6,
        duration: "2hr 10min",
        totalVehicles: 10,
      },
    ],
    orders: [
      {
        id: "#FXZ-4567",
        carriageId: "CRG-001",
        shippingNumber: "12415-123674-11",
        startingRoute: "Paris 19, France",
        endingRoute: "Dresden, Germany",
        status: "on-the-way" as VehicleStatus,
        duration: "2hr 10min",
        estimatedDeliveryTime: new Date(),
        trackingUpdates: [] as CarriageTracking[],
      },
      // Add more demo data
    ],
  };
}

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Carriage", href: "/carriage" },
  { label: "Call a courier", href: "/carriage/call" },
];

export default async function CallCourier() {
  // const data = getCarriageData;

  return (
    <ContentLayout title={`Call a courier`}>
      <Breadcrumbs items={breadcrumbItems} />
      <CourierCall />
    </ContentLayout>
  );
}
