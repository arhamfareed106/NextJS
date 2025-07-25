'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import Image from 'next/image';

interface MonthDropdownProps {
  onChange?: (month: string) => void;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function MonthDropdown({ onChange }: MonthDropdownProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>('May'); // default value

  useEffect(() => {
    if (onChange) {
      onChange(selectedMonth);
    }
  }, [selectedMonth, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="max-w-[200px] w-full justify-between rounded-[12px] text-left font-normal">
          {selectedMonth}
          <Image src="/icons/arrow-down.svg" width={14} height={14} alt="arrow" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-2" align="start">
        <ul className="grid grid-cols-2 gap-2">
          {MONTHS.map((month) => (
            <li key={month}>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedMonth(month)}>
                {month}
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
