// app/discounts/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DiscountForm } from '@/components/discount-management/discount-form';
import { EditDiscountDialog } from '@/components/discount-management/edit-discount-dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { PriceAdjustment } from '@/types';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import Breadcrumbs from '@/components/wrappers/breadcrumbs';
import { Heading } from '@/components/wrappers/heading';
import { DiscountList } from '@/components/discount-management/discount-list';
import { Activation } from '@/components/discount-management/activation';
import { DiscountComponent } from '@/components/discount-management/discount-component';

export default function DiscountsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<PriceAdjustment | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (discount: PriceAdjustment) => {
    setSelectedDiscount(discount);
    setIsEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    setSelectedDiscount(undefined);
  };

  const handleDiscountSubmit = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Price rules', href: '/price-management' },
  ];

  return (
    <ContentLayout title="Price rules">
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      <div className="mx-auto flex flex-col gap-[30px]">
        {/* <Heading
          level="h4"
          heading="Price rules"
          subheading="Manage and create your pricing strategy"
        /> */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold ">Activation of discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Activation />
          </CardContent>
        </Card>

        {/* <DiscountComponent /> */}
        <Card>
          <CardHeader>
            <CardTitle>Add Price Rule</CardTitle>
          </CardHeader>
          <CardContent>
            <DiscountForm onSubmit={handleDiscountSubmit} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Price Rules</CardTitle>
            <Separator className="h-2" />
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search categories..." className="pl-8" value={searchQuery} onChange={handleSearch} />
            </div>
          </CardHeader>
          <CardContent>
            <DiscountList key={refreshKey} onEdit={handleEdit} searchQuery={searchQuery} />
          </CardContent>
        </Card>

        <EditDiscountDialog open={isEditDialogOpen} onOpenChange={handleDialogClose} discount={selectedDiscount} />
      </div>
    </ContentLayout>
  );
}
