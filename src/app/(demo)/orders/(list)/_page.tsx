"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import OrdersCarousel from "@/components/blocks/orders-carousel";

export default function OrdersPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Orders List", href: "/orders/list" },
  ];

  return (
    <ContentLayout title="Orders List">
      <Breadcrumbs items={breadcrumbItems} />

      {/* CONTENT */}
      <Separator className="py-2" />
      <OrdersCarousel />
    </ContentLayout>
  );
}
