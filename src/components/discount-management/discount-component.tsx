import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import DiscountDataTable from './discount-data-table';
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination';
import { Button } from '../ui/button';

export const DiscountComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-bold ">Discounts added by you</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-[30px]">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-[214px]">
              <Image
                width={18}
                height={18}
                src={'/icons/search-normal.svg'}
                alt=""
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
              />
              <Input placeholder="Search category ..." className={cn('pl-10 h-[49px]')} />
            </div>
            <Select>
              <SelectTrigger className="w-[95px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DiscountDataTable />
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#777E90]  truncate font-medium">Displaying 1 to 10 of 100 entries</p>
            <Pagination className="w-max mx-0 ">
              <PaginationContent className="gap-4 ">
                <PaginationItem>
                  <Button variant="outline" size="default" className="gap-1 p-0 w-[40px] h-[41px] ">
                    {/* <ChevronLeft className="h-4 w-4" /> */}
                    <Image src={'/icons/arrow-left.svg'} width={24} height={24} alt="" />
                    {/* <span>Previous</span> */}
                  </Button>
                </PaginationItem>
                {/* {renderPaginationItems()} */}
                <PaginationItem>
                  <Button variant="outline" size="default" className="gap-1 p-0 w-[40px] h-[41px] ">
                    {/* <span>Next</span> */}
                    <Image src={'/icons/arrow-left-blue.svg'} width={24} height={24} alt="" />

                    {/* <ChevronRight className="h-4 w-4" /> */}
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
