// app/carriage/page.tsx
'use client';
import { Suspense } from 'react';
import VehiclesOverview from '@/components/carriage/vehicles-overview';
import Breadcrumbs from '@/components/wrappers/breadcrumbs';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import CarrierCarousel from '@/components/blocks/carrier-carousel';
import PickupOrders from './pickup-orders';
import Orders from './orders';

const breadcrumbItems = [
  { label: 'Home', href: '/dashboard' },
  { label: 'Carriage', href: '/carriage' },
];

export default function CarriagePage() {
  return (
    <ContentLayout title={`Carriage`}>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex w-full flex-col gap-[30px]">
        <CarrierCarousel />

        <PickupOrders />

        <div className="mx-auto w-full ">
          <Suspense fallback={<div>Loading overview...</div>}>
            <VehiclesOverview />
          </Suspense>
        </div>
        <Orders />
      </div>
    </ContentLayout>
  );
}
