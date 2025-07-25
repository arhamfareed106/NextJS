'use client';

import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import Image from 'next/image';

export default function DateDropdown() {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());

  // Format display date like "2024.05.15 - 2024.05.30"
  const displayDate =
    fromDate && toDate ? `${format(fromDate, 'yyyy.MM.dd')} - ${format(toDate, 'yyyy.MM.dd')}` : 'Date';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[260px] justify-between rounded-[12px]">
          {displayDate}
          <Image src="/icons/arrow-down.svg" width={14} height={14} alt="" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[260px] rounded-[16px] px-4 py-4 space-y-4">
        {/* From Date */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">From</label>
          <Popover>
            <PopoverTrigger asChild className="w-[105px]">
              <Button variant="outline" className="w-full justify-start text-left font-normal text-sm">
                {fromDate ? format(fromDate, 'yyyy-MM-dd') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">To</label>
          <Popover>
            <PopoverTrigger asChild className="w-[105px]">
              <Button variant="outline" className="w-full justify-start text-left font-normal text-sm">
                {toDate ? format(toDate, 'yyyy-MM-dd') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
