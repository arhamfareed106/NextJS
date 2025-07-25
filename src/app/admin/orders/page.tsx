"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useGetAdminOrdersQuery } from "@/lib/api/hooks";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data, isLoading } = useGetAdminOrdersQuery({
    query: {
      page: currentPage,
      per_page: 10,
    },
  });

  const orders = data?.data || [];
  const pagination = data?.meta;

  const handleRowClick = (row: any) => {
    router.push(`/admin/orders/${row.original.id}`);
  };
  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Admin Panel: Orders", href: "/admin/orders" },
  ];

  return (
    <ContentLayout title="Admin Panel: Orders">
      <Breadcrumbs items={breadcrumbItems} />
      <Separator className="py-2 invisible" />
      <div className="">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all customer orders. View order details, status,
            and shipping information.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={orders}
              columns={columns}
              pagination={pagination}
              onPageChange={setCurrentPage}
              isLoading={isLoading}
              onRowClick={handleRowClick}
            />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
