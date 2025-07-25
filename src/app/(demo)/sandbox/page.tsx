"use client";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { Separator } from "@radix-ui/react-dropdown-menu";

import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import EarningsCard from "@/components/cards/BalanceCard";
import OrderCard from "@/components/cards/OrderCard";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Sandbox", href: "/sandbox" },
  ];

  return (
    <ContentLayout title="Sandbox">
      <Breadcrumbs items={breadcrumbItems} />

      {/* CONTENT */}
      <Separator className="py-2" />
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
        <EarningsCard
          title="TEst1"
          iconName="MessageSquare"
          amount="128k"
          currency="€"
          percentage="12"
          timeframe="This week"
        />

        <OrderCard
          title="Waiting"
          value="12100"
          change={12}
          icon="waiting"
          variant="waiting"
        />

        <OrderCard
          title="Completed"
          value="2541"
          change={-5}
          icon="completed"
          variant="completed"
        />

        <OrderCard
          title="Processing"
          value="12100"
          change={-12}
          icon="processing"
          variant="processing"
        />

        <OrderCard
          title="Returned"
          value="12100"
          change={+7}
          icon="returned"
          variant="returned"
        />

        {/* <InvoiceCard /> */}
      </div>
    </ContentLayout>
  );
}
