"use client";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import PopularProducts from "@/components/blocks/products-popular";
import { Separator } from "@radix-ui/react-dropdown-menu";
import SalesStats from "@/components/blocks/sales-stats";
import CardsCarousel from "@/components/blocks/cards-carousel";
import RecentOrders from "@/components/blocks/recent-orders";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;

  const breadcrumbItems = [{ label: "Home", href: "/dashboard" }];

  return (
    <ContentLayout title="Dashboard">
      <CardsCarousel />
      <Separator className="py-primary-half" />
      <div className="flex md:flex-row flex-col flex-grow gap-primary">
        <div className="basis-1/3">
          <PopularProducts />
        </div>
        <div className="basis-2/3 shrink ">
          <SalesStats />{" "}
        </div>
      </div>
      <Separator className="py-primary-half" />
      <RecentOrders />
    </ContentLayout>
  );
}
