'use client';

import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PercentageDropdown() {
  const [increase, setIncrease] = useState<number>(10);
  const [discount, setDiscount] = useState<number>(0);

  const handleIncreaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setIncrease(value);
    if (value > 0) {
      setDiscount(0);
    }
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDiscount(value);
    if (value > 0) {
      setIncrease(0);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          {increase > 0 ? `+ ${increase}%` : `- ${discount}%`}
          <Image src={'/icons/arrow-down.svg'} width={14} height={14} alt="" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[260px] rounded-[16px] px-4 py-4 space-y-4">
        {/* Increase Price */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Increase price</label>
          <div className="flex items-center bg-muted rounded-md px-2 py-1 w-[105px] justify-between">
            <span className="text-sm text-muted-foreground">+ </span>
            <input
              type="number"
              value={increase}
              onChange={handleIncreaseChange}
              className="w-full bg-transparent text-right text-sm outline-none"
              min={0}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>

        {/* Make a Discount */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Make a discount</label>
          <div className="flex items-center bg-muted rounded-md px-2 py-1 w-[105px] justify-between">
            <span className="text-sm text-muted-foreground">- </span>
            <input
              type="number"
              value={discount}
              onChange={handleDiscountChange}
              className="w-full bg-transparent text-right text-sm outline-none"
              min={0}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
