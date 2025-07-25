// File: CategoryList.tsx

'use client';
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Breadcrumbs from '@/components/wrappers/breadcrumbs';
import { Separator } from '@radix-ui/react-separator';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import CategorySection from './CategorySection';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const CategoryList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Category List', href: '/products/categories' },
  ];

  return (
    <ContentLayout title="Category List">
      {/* <Breadcrumbs items={breadcrumbItems} />
      <Separator className="py-primary-half" /> */}
      <Card className="  ">
        <CardContent className="py-[30px] px-7 flex flex-col gap-[30px]">
          <h1 className="text-base font-bold text-foreground">Category List</h1>
          <div className="relative max-w-[214px] w-full">
            <Image
              width={18}
              height={18}
              src={'/icons/search-normal.svg'}
              alt=""
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
            />
            <Input
              className="pl-12 h-12 text-base border border-gray-200 focus:border-foreground rounded-lg"
              placeholder="Search category ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <CategorySection searchTerm={searchTerm} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default CategoryList;
