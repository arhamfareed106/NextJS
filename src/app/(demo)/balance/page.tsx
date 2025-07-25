'use client';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { SalesTable, SaleRecord } from '@/components/balance/SalesTable';
import BalanceSheetsCarousel from '@/components/blocks/balance-sheets-carousel';
import BalanceSummary from '@/components/balance/BalanceSummary';
import { SalesChart } from '@/components/balance/SalesChart';

import { useGetBalanceSheetsQuery } from '@/lib/api/hooks';

export default function DashboardPage() {
  const { data, isLoading } = useGetBalanceSheetsQuery();

  // Transform API data to match SaleRecord type
  const transformedData: SaleRecord[] =
    data?.data?.map((item: any) => ({
      date: item.created_at.split('T')[0],
      status: 'Paid', // or 'Pending' if you have status logic
      orderNumber: `INV-${item.id.toString().padStart(4, '0')}`,
      earnings: item.user_revenue,
    })) || [];

  return (
    <ContentLayout title="Orders List">
      <div className="flex flex-col gap-[30px]">
        <BalanceSummary />
        <BalanceSheetsCarousel />
        <SalesChart />
        <SalesTable sales={transformedData} isLoading={isLoading} />
      </div>
    </ContentLayout>
  );
}
