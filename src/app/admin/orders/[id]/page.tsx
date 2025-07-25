"use client";

import { use } from "react";
import Image from "next/image";
import { useGetAdminOrderByIdQuery } from "@/lib/api/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Separator } from "@/components/ui/separator";
import { AOrder, AOrderEvent, AOrderModification } from "@/types";

interface Product {
  id: number;
  modification_id: number;
  quantity: number;
  product_price: number;
  total_price: number;
  product: {
    title: string;
    modification_title: string;
    category: string;
    sku: string;
    ean: string;
    image_url: string;
  };
}

interface OrderEvent {
  event_code: string;
  event_name: string;
  event_date: string;
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const {
    data: response,
    isLoading,
    error,
  } = useGetAdminOrderByIdQuery({
    path: { id: resolvedParams.id },
  });

  const order = response?.data;

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (error) {
    console.error("API Error:", error);
    return (
      <ContentLayout title="Orders">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/dashboard" },
            { label: "Admin Panel: Orders", href: "/admin/orders" },
            { label: "Order Details", href: "#" },
          ]}
        />
        <Separator className="py-2 invisible" />
        <div className="container mx-auto">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Error Loading Order
            </h2>
            <p className="text-muted-foreground">
              {error.message ||
                "Failed to load order details. Please try again."}
            </p>
          </div>
        </div>
      </ContentLayout>
    );
  }

  if (!order) {
    console.log("No order data found");
    return (
      <div className="container mx-auto py-10">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-muted-foreground">
            The order you&aposre looking for doesn&apost exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Order {order?.identifier || "N/A"}
            </h1>
            <p className="text-muted-foreground mt-2">
              Created on{" "}
              {order?.created_at ? formatDate(order.created_at) : "N/A"}
            </p>
          </div>
          <Badge
            variant={getStatusVariant(order?.status || "")}
            className="text-lg px-4 py-2"
          >
            {order?.status
              ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
              : "Unknown"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Order Amount
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.order_amount?.toFixed(2) || "0.00"}{" "}
                  {order?.order_currency || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Packages
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.packages || 0} pcs
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Weight
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.weight || 0} kg
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Shipment Barcode
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.shipment_barcode || "-"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Delivery Type
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.delivery?.type_code
                    ? order.delivery.type_code.charAt(0).toUpperCase() +
                      order.delivery.type_code.slice(1)
                    : "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Delivered At
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.delivered_at ? formatDate(order.delivered_at) : "-"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Location
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.location || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Status
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.display_text || "-"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Name
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.receiver?.name || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Phone
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.receiver?.phone || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Email
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.receiver?.email || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Address
                </dt>
                <dd className="text-lg font-semibold">
                  {order?.receiver ? (
                    <>
                      {order.receiver.street} {order.receiver.house}
                      {order.receiver.apartment &&
                        `, Apt ${order.receiver.apartment}`}
                      <br />
                      {order.receiver.city}, {order.receiver.postal_code}
                      <br />
                      {order.receiver.country_code}
                    </>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order?.products?.map((product: Product) => (
                <div
                  key={product.id}
                  className="flex items-start space-x-4 p-4 border rounded-lg"
                >
                  {product.product.image_url && (
                    <Image
                      src={product.product.image_url}
                      alt={product.product.title}
                      width={64}
                      height={64}
                      className="object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold">{product.product.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.product.modification_title}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>{" "}
                        {product.quantity}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price:</span>{" "}
                        {product.product_price.toFixed(2)}{" "}
                        {order.order_currency}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total:</span>{" "}
                        {product.total_price.toFixed(2)} {order.order_currency}
                      </div>
                      <div>
                        <span className="text-muted-foreground">SKU:</span>{" "}
                        {product.product.sku}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Events */}
        <Card>
          <CardHeader>
            <CardTitle>Order Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order?.events?.map((event: OrderEvent, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <p className="font-medium">{event.event_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.event_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Returned Products */}
        {order?.returned_products && order.returned_products.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Returned Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.returned_products.map((product: Product) => (
                  <div
                    key={product.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg"
                  >
                    {product.product.image_url && (
                      <Image
                        src={product.product.image_url}
                        alt={product.product.title}
                        width={64}
                        height={64}
                        className="object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.product.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.product.modification_title}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Quantity:
                          </span>{" "}
                          {product.quantity}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span>{" "}
                          {product.product_price.toFixed(2)}{" "}
                          {order.order_currency}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total:</span>{" "}
                          {product.total_price.toFixed(2)}{" "}
                          {order.order_currency}
                        </div>
                        <div>
                          <span className="text-muted-foreground">SKU:</span>{" "}
                          {product.product.sku}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function OrderDetailSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j}>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "pending":
      return "secondary";
    case "confirmed":
      return "default";
    case "shipped":
      return "outline";
    case "delivered":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
}
