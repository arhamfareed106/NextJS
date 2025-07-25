// components/orders/order-details-view.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Phone, Mail, Package, PrinterIcon } from 'lucide-react';
import { OrderTimeline } from './order-timeline';
import ProductTable from './product-table';

interface OrderDetailsViewProps {
  order: Order;
}
const products = [
  {
    id: '1',
    name: 'Product 1',
    image: '/Rectangle 12.svg',
    price: 24,
    qty: 2,
    storage: '256GB',
    sku: 'SKU123',
    ean: 'EAN456',
  },
  {
    id: '2',
    name: 'Product 2',
    image: '/Rectangle 12.svg',
    price: 99,
    qty: 1,
    storage: '128GB',
    sku: 'SKU789',
    ean: 'EAN101',
  },
];
export function OrderDetailsView({ order }: OrderDetailsViewProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const mappedProducts = order.data.products.map((item: any, index: number) => ({
    id: index.toString(),
    name: item.product.title,
    image: item.product.image_url[0] || '/placeholder.svg',
    price: item.product_price,
    qty: item.quantity,
    storage: item.product.modification_title,
    sku: item.product.sku,
    ean: item.product.ean,
  }));

  return (
    <>
      <div className="flex  gap-[30px] flex-col-reverse lg:flex-row auto-rows-min">
        <Card className="row-span-2 max-w-[656px] w-full">
          {/* ORDER LIST */}
          <CardHeader className="flex md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-base">Order details </CardTitle>
              {/* <p className="text-sm text-gray-500">{new Date(order?.data?.created_at || '').toLocaleString()}</p> */}
            </div>
            {/* <div className="flex gap-2">
              <Badge variant="secondary">{order?.data?.confirmed ? 'Completed' : 'Pending'}</Badge>
              <Badge variant="outline">{order?.data?.status}</Badge>
            </div> */}
          </CardHeader>
          <CardContent>
            {/* <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Products</h3>
                <div className="space-y-4">
                  {order?.data?.products?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.product?.title || 'Unknown Product'}</h4>
                          <p className="text-sm text-gray-500">{item.product?.modification_title || ''}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€{item.product_price?.toFixed(2) || '0.00'}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between border-t pt-4">
                <div>
                  <p className="text-sm text-gray-500">Subtotal</p>
                  <p className="text-sm text-gray-500">Tax</p>
                  <p className="text-sm text-gray-500">Shipping</p>
                  <p className="font-medium mt-2">Total</p>
                </div>
                <div className="text-right">
                  <p>€{order?.data?.order_amount?.toFixed(2) || '0.00'}</p>
                  <p>€0.00</p>
                  <p>€0.00</p>
                  <p className="font-medium mt-2">€{order?.data?.order_amount?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </div> */}
            <div className="flex flex-col gap-[30px]">
              <ProductTable products={order.data.products} />
              <div className="rounded-[25px] max-w-[262px] w-full ml-auto border border-gray-100 bg-[#F7F7F9] px-6 pt-[32px] pb-6 ">
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-base text-foreground">Subtotal:</span>
                    <span className="font-semibold text-sm text-foreground">€2093</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-base text-foreground">Discount:</span>
                    <span className="font-semibold text-base text-foreground">$2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-base text-foreground">Total:</span>
                    <span className="font-semibold text-base text-foreground">€2113</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8 max-w-[374px] w-full">
          <Card>
            <CardHeader className="px-6 py-[30px]">
              <CardTitle className="text-base font-bold">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="pb-[30px] border-b border-gray-100">
                <h3 className="text-sm font-semibold">{order?.data?.receiver?.name || 'Unknown'}</h3>
              </div>

              <div className="flex pb-[30px] mt-[35px] border-b border-gray-100 flex-col gap-[30px]">
                <div className="text-base font-bold">Shipping Address</div>
                <div>
                  <p className="text-base text-[#777E90] font-medium">
                    {`${order?.data?.receiver?.street || ''} ${order?.data?.receiver?.house || ''}${
                      order?.data?.receiver?.apartment ? `, ${order?.data?.receiver.apartment}` : ''
                    }`}
                  </p>
                  <p className="text-base text-[#777E90] font-medium">
                    {order?.data?.receiver?.city || ''} {order?.data?.receiver?.postal_code || ''}
                  </p>
                  <p className="text-base text-[#777E90] font-medium">{order?.data?.receiver?.country_code || ''}</p>
                </div>
              </div>

              {order?.data?.shipment_barcode && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium">{order?.data?.shipment_barcode}</p>
                </div>
              )}

              <div className="pt-4">
                <Button variant="default" className="w-full">
                  <PrinterIcon className="h-4 w-4 mr-2" /> Shipment label
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="py-4 gap-4 md:w-1/2">
        <OrderTimeline order={order} />
      </div>
    </>
  );
}
