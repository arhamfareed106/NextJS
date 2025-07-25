import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { columns as carrageOrderColumns } from '@/components/orders/table/columns-carriage';
import { Search } from '@/components/orders/filters/search';
import { StatusFilter } from '@/components/orders/filters/status-filter';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useGetOrdersQuery } from '@/lib/api/hooks';
import { useState } from 'react';

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: ordersData,
    isLoading,
    error,
  } = useGetOrdersQuery({
    query: {
      page: currentPage,
      per_page: 10,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const orders = ordersData?.data || [];
  const ordersPagination = ordersData?.meta;

  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Order List</CardTitle>
          {/* <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* <div className="flex items-center gap-4">
            <Search />
            <StatusFilter />
          </div> */}
          <DataTable
            data={orders}
            pagination={ordersPagination}
            columns={carrageOrderColumns}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>
    </Card>
  );
}
