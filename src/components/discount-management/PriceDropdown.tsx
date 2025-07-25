'use client';

import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PriceDropdown() {
  const [fromPrice, setFromPrice] = useState<number>(100);
  const [toPrice, setToPrice] = useState<number>(200);

  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className=" justify-between rounded-[12px]">
            From {fromPrice}€ - To {toPrice}€
            <Image src="/icons/arrow-down.svg" width={14} height={14} alt="" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className=" rounded-[16px]   w-[260px] px-4 py-4 space-y-4">
          {/* From */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">From</label>
            <div className="flex items-center bg-muted rounded-md px-2 py-1 w-[105px] justify-between">
              <input
                type="number"
                value={fromPrice}
                onChange={(e) => setFromPrice(Number(e.target.value))}
                className="w-full bg-transparent text-right text-sm outline-none"
              />
              <span className="text-sm text-muted-foreground">€</span>
            </div>
          </div>

          {/* To */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">To</label>
            <div className="flex items-center bg-muted rounded-md px-2 py-1 w-[105px] justify-between">
              <input
                type="number"
                value={toPrice}
                onChange={(e) => setToPrice(Number(e.target.value))}
                className="w-full bg-transparent text-right text-sm outline-none"
              />
              <span className="text-sm text-muted-foreground">€</span>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
