'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Search } from '@/components/orders/filters/search';
import { StatusFilter } from '@/components/orders/filters/status-filter';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { Separator } from '@radix-ui/react-dropdown-menu';
import OrdersCarousel from '@/components/blocks/orders-carousel';
import Breadcrumbs from '@/components/wrappers/breadcrumbs';
import { useGetOrdersQuery } from '@/lib/api/hooks';
import { columns as orderColumns } from '@/components/orders/table/columns';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DateDropdown from '@/components/blocks/date-dropdown';
import SingleDateDropdown from '@/components/blocks/SingleDateDropdown';

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const pageSizes = ['10', '20', '30', '50', '100'];

export default function OrdersPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 🟡 Filter States
  const [ean, setEan] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [pageSize, setPageSize] = useState('10');

  // 🟢 Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [ean, price, status, date, pageSize]);
  useEffect(() => {
    setEan('');
    setPrice('');
    setStatus('');
    setDate('');
    setPageSize('10');
    setCurrentPage(1);
  }, []);
  // 🔵 API Query
  const query: Record<string, any> = {
    page: currentPage,
    per_page: parseInt(pageSize),
  };

  // Only add filters if they have values
  if (ean) query.ean = ean;
  if (price) query.price = price;
  if (status) query.status = status;
  if (date) query.date = date;

  const { data, isLoading, error } = useGetOrdersQuery({ query });

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Orders List', href: '/orders/list' },
  ];

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const orders = data?.data || [];
  const pagination = data?.meta;
  const handleClearFilters = () => {
    setEan('');
    setPrice('');
    setStatus('');
    setDate('');
    setPageSize('10');
    setCurrentPage(1);
  };
  const isAnyFilterActive = ean !== '' || price !== '' || status !== '' || date !== '' || pageSize !== '10';
  return (
    <ContentLayout title="Orders List">
      <Breadcrumbs items={breadcrumbItems} />

      <Separator className="py-2" />
      <OrdersCarousel />

      <Card className="mx-auto my-8">
        <CardContent className="py-8 px-7">
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-base font-bold">Orders List</h1>
              <Button variant="ghost" className="gap-2 items-center" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Hide filters' : 'Show filters'}
                <Image
                  src={showFilters ? '/icons/arrow-up.svg' : '/icons/arrow-down.svg'}
                  width={18}
                  height={18}
                  alt="arrow"
                  className={`transition-transform duration-300 ${showFilters ? '' : 'rotate-180'}`}
                />
              </Button>
            </div>

            {/* 🔽 FILTER SECTION */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                showFilters ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="grid grid-cols-2 lg:grid-cols-3 filters gap-[30px]">
                <Input
                  placeholder="Ean code"
                  className="h-[49px] px-6"
                  value={ean}
                  onChange={(e) => setEan(e.target.value)}
                />

                <Select value={status} onValueChange={(value) => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Price"
                  type="number"
                  className="h-[49px] px-6"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {isAnyFilterActive && (
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="ghost"
                      className="text-sm text-gray-500 hover:text-black"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-100 h-px w-full"></div>
            <div className="lg:hidden">
              <Search />
            </div>

            {/* 🔽 CONTROLS + TABLE */}
            <div className="flex flex-col gap-5">
              <div className="flex justify-end items-center gap-5 lg:gap-[30px]">
                <SingleDateDropdown onChange={setDate} />

                <Select value={pageSize} onValueChange={(v) => setPageSize(v)}>
                  <SelectTrigger className="w-[49px] lg:w-[95px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant={'secondary'}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <div className="lg:hidden">
                <Button size="md" className="w-full">
                  <Image width={24} height={24} src="/icons/add.svg" alt="Add Product" />
                  Add Product
                </Button>
              </div>

              {error ? (
                <div className="text-red-500 text-center">Error: {error.message}</div>
              ) : (
                <DataTable
                  data={orders}
                  columns={orderColumns}
                  pagination={pagination}
                  onPageChange={setCurrentPage}
                  isLoading={isLoading} // ✅ if your table supports it
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
