'use client';

// app/invoices/page.tsx
import { Separator } from '@radix-ui/react-dropdown-menu';
import Breadcrumbs from '@/components/wrappers/breadcrumbs';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import InvoiceCarousel from '@/components/blocks/invoice-carousel';
import { InvoicesTable } from '@/components/invoices/invoices-table';
import { useGetInvoicesQuery } from '@/lib/api/hooks';
import { Skeleton } from '@/components/ui/skeleton';

export default function InvoicesPage() {
  const { data, isLoading, error } = useGetInvoicesQuery();

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Invoices', href: '/invoices' },
  ];

  return (
    <ContentLayout title="Invoices">
      {/* <Breadcrumbs items={breadcrumbItems} />
      <Separator className="py-2" /> */}
      <div className="flex flex-col gap-[30px]">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <div className="text-red-500">Error loading invoices. Please try again later.</div>
        ) : (
          <InvoiceCarousel invoices={data?.data || []} />
        )}

        <InvoicesTable />
      </div>
    </ContentLayout>
  );
}
